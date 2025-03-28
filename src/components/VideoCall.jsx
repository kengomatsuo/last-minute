import { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { UserContext } from '../contexts/UserContext'
import { 
  doc, 
  getDoc,
  onSnapshot, 
  updateDoc, 
  setDoc, 
  deleteField 
} from 'firebase/firestore'
import { db } from '../../firebaseConfig'

/**
 * Video call component with WebRTC functionality that allows users to join,
 * leave, and reconnect to calls.
 * 
 * @param {Object} props - Component props
 * @param {string} props.courseId - The ID of the course for this session
 * @param {Function} props.onError - Error handler callback
 * @returns {JSX.Element} The video call component
 */
const VideoCall = ({ courseId, onError }) => {
  const { user } = useContext(UserContext)
  const [isConnected, setIsConnected] = useState(false)
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [deviceStatus, setDeviceStatus] = useState({
    hasCamera: false,
    hasMicrophone: false,
    checking: true
  })
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const peerConnectionRef = useRef(null)
  const roomDocRef = useRef(null)
  const unsubscribeRef = useRef(null)

  // WebRTC configuration with STUN servers
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  }

  /**
   * Checks available media devices and updates the device status state.
   * 
   * @returns {Promise<void>}
   */
  const checkDevices = useCallback(async () => {
    try {
      setDeviceStatus(prevStatus => ({ ...prevStatus, checking: true }))
      
      // First check for device permissions
      let hasCamera = false
      let hasMicrophone = false
      
      try {
        // Try to access media devices to verify they're really available
        const testStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        
        // Check which tracks we actually got
        testStream.getTracks().forEach(track => {
          if (track.kind === 'video') {
            hasCamera = true
          }
          if (track.kind === 'audio') {
            hasMicrophone = true
          }
          // Stop the track after checking
          track.stop()
        })
      } catch (permissionErr) {
        console.log('Permission check failed:', permissionErr)
        
        // Fallback to device enumeration if permission check fails
        const devices = await navigator.mediaDevices.enumerateDevices()
        hasCamera = devices.some(device => device.kind === 'videoinput' && device.deviceId)
        hasMicrophone = devices.some(device => device.kind === 'audioinput' && device.deviceId)
      }
      
      setDeviceStatus({
        hasCamera,
        hasMicrophone,
        checking: false
      })
      
      // Removed error notification for no devices
    } catch (err) {
      console.error('Error checking media devices:', err)
      setDeviceStatus({
        hasCamera: false,
        hasMicrophone: false,
        checking: false
      })
      onError('Unable to check for camera/microphone: ' + err.message)
    }
  }, [onError])

  // Check available media devices on component mount
  useEffect(() => {
    checkDevices()
    
    // Set up device change listener
    const handleDeviceChange = () => {
      console.log('Device change detected')
      checkDevices()
    }
    
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    
    // Clean up listener on unmount
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [checkDevices])

  useEffect(() => {
    if (!courseId || !user) return

    // Initialize room reference
    roomDocRef.current = doc(db, 'courses', courseId, 'calls', 'room')

    // Clean up function for component unmount
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
      
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }
      
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
      
      leaveRoom()
    }
  }, [courseId, user])

  /**
   * Initializes the local media stream with available devices.
   * 
   * @returns {Promise<MediaStream|null>} The local media stream or null on error
   */
  const setupLocalStream = async () => {
    try {
      // Stop any previous streams
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
      
      const constraints = {
        video: deviceStatus.hasCamera,
        audio: deviceStatus.hasMicrophone
      }
      
      // If no devices available, inform user but allow call to continue
      if (!constraints.video && !constraints.audio) {
        return null
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setLocalStream(stream)
      
      if (localVideoRef.current && constraints.video) {
        localVideoRef.current.srcObject = stream
      }
      
      // If video isn't available, mark as video off
      if (!constraints.video) {
        setIsVideoOff(true)
      }
      
      return stream
    } catch (err) {
      console.error('Media device error:', err)
      
      // Try fallback to audio only if video fails
      if (err.name === 'NotFoundError' && deviceStatus.hasCamera && 
          deviceStatus.hasMicrophone) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
          })
          setLocalStream(audioStream)
          setIsVideoOff(true)
          return audioStream
        } catch (audioErr) {
          onError('Could not access microphone: ' + audioErr.message)
          return null
        }
      } else {
        onError('Could not access media devices: ' + err.message)
        return null
      }
    }
  }

  /**
   * Refreshes the media devices and attempts to reconnect the stream.
   * 
   * @returns {Promise<void>}
   */
  const refreshDevices = async () => {
    await checkDevices()
    
    // If already in a call, update the stream
    if (isConnected && peerConnectionRef.current) {
      const newStream = await setupLocalStream()
      
      if (newStream) {
        // Remove old tracks
        const senders = peerConnectionRef.current.getSenders()
        senders.forEach(sender => {
          peerConnectionRef.current.removeTrack(sender)
        })
        
        // Add new tracks
        newStream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, newStream)
        })
      }
    }
  }

  /**
   * Creates and initializes a WebRTC peer connection.
   * 
   * @param {MediaStream} stream - The local media stream to add to the connection
   * @returns {RTCPeerConnection|null} The initialized peer connection or null on error
   */
  const createPeerConnection = (stream) => {
    try {
      const peerConnection = new RTCPeerConnection(configuration)
      
      // Add local tracks to the peer connection
      if (stream) {
        stream.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream)
        })
      }

      // Handle incoming remote tracks
      peerConnection.ontrack = event => {
        if (remoteVideoRef.current && event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0])
          remoteVideoRef.current.srcObject = event.streams[0]
        }
      }

      // Handle ICE candidates
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          const candidateData = event.candidate.toJSON()
          updateDoc(roomDocRef.current, {
            [`candidates.${user.uid}`]: [...(peerConnection.iceCandidates || []), 
              candidateData]
          }).catch(error => {
            console.error('Error updating ICE candidates:', error)
          })
        }
      }

      // Connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState)
        if (peerConnection.connectionState === 'connected') {
          setIsConnected(true)
        } else if (['disconnected', 'failed', 'closed'].includes(
          peerConnection.connectionState)) {
          setIsConnected(false)
        }
      }
      
      return peerConnection
    } catch (err) {
      console.error('Error creating peer connection:', err)
      onError('Failed to create connection: ' + err.message)
      return null
    }
  }

  /**
   * Joins the video call room, creating a connection with another participant.
   * 
   * @returns {Promise<void>}
   */
  const joinRoom = async () => {
    try {
      // Early return if still checking devices
      if (deviceStatus.checking) {
        onError('Please wait while we check your devices...')
        return
      }
      
      // Setup local stream first
      const stream = await setupLocalStream()
      
      // Create peer connection even without media if needed
      const peerConnection = createPeerConnection(stream)
      if (!peerConnection) return
      
      peerConnectionRef.current = peerConnection

      // Listen for remote session changes
      unsubscribeRef.current = onSnapshot(roomDocRef.current, async (snapshot) => {
        const data = snapshot.data() || {}
        
        // Handle offers
        if (data.offer && data.offeredBy !== user.uid 
            && !peerConnection.remoteDescription) {
          try {
            // Set remote description from offer
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(data.offer)
            )
            
            // Create answer
            const answer = await peerConnection.createAnswer()
            await peerConnection.setLocalDescription(answer)
            
            // Update room with answer
            await updateDoc(roomDocRef.current, {
              answer: answer,
              answeredBy: user.uid,
              participants: [...(data.participants || []), user.uid]
            })
          } catch (err) {
            console.error('Error handling offer:', err)
            onError('Error handling connection offer: ' + err.message)
          }
        }
        
        // Handle answers
        if (data.answer && data.offeredBy === user.uid 
            && !peerConnection.remoteDescription) {
          try {
            const rtcSessionDescription = new RTCSessionDescription(data.answer)
            await peerConnection.setRemoteDescription(rtcSessionDescription)
          } catch (err) {
            console.error('Error handling answer:', err) 
            onError('Error handling connection answer: ' + err.message)
          }
        }
        
        // Handle ICE candidates
        if (data.candidates) {
          const remoteCandidates = Object.entries(data.candidates)
            .filter(([uid]) => uid !== user.uid)
            .flatMap(([, candidates]) => candidates)
          
          for (const candidate of remoteCandidates) {
            try {
              if (!peerConnection.remoteDescription) {
                continue
              }
              await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            } catch (e) {
              // Some candidates might arrive before setRemoteDescription
              console.warn('Error adding ice candidate:', e)
            }
          }
        }
      })
      
      // Check if room exists and create or join accordingly
      try {
        const roomSnapshot = await getDoc(roomDocRef.current)
        const roomData = roomSnapshot.data() || {}
        
        if (!roomData.offer) {
          // Create a new room with an offer
          const offer = await peerConnection.createOffer()
          await peerConnection.setLocalDescription(offer)
          
          await setDoc(roomDocRef.current, {
            offer: offer,
            offeredBy: user.uid,
            participants: [user.uid],
            createdAt: new Date()
          }, { merge: true })
        } else if (!roomData.answer) {
          // Room exists but no answer yet - can join
          console.log('Joining existing room...')
        } else {
          // Room is full or call is in progress
          console.log('Call already in progress, attempting to join...')
        }
      } catch (error) {
        console.error('Error joining room:', error)
        onError('Error joining call: ' + error.message)
      }
    } catch (error) {
      console.error('Error in joinRoom:', error)
      onError('Error joining call: ' + error.message)
    }
  }

  /**
   * Leaves the video call room, cleaning up resources.
   * 
   * @returns {Promise<void>}
   */
  const leaveRoom = async () => {
    try {
      // If we have a room reference, update participants
      if (roomDocRef.current) {
        try {
          const roomSnapshot = await getDoc(roomDocRef.current)
          const roomData = roomSnapshot.data() || {}
          
          if (roomData.participants) {
            await updateDoc(roomDocRef.current, {
              participants: roomData.participants.filter(id => id !== user.uid),
              [`candidates.${user.uid}`]: deleteField()
            })
          }
        } catch (error) {
          console.error('Error updating participants:', error)
        }
      }
      
      // Unsubscribe from room updates
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
      
      // Close peer connection
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
        peerConnectionRef.current = null
      }
      
      // Stop media tracks
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
        setLocalStream(null)
      }
      
      setRemoteStream(null)
      setIsConnected(false)
    } catch (error) {
      console.error('Error leaving room:', error)
      onError('Error leaving call: ' + error.message)
    }
  }

  /**
   * Toggles the audio mute state.
   */
  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach(track => {
        track.enabled = !track.enabled
      })
      setIsMuted(!isMuted)
    }
  }

  /**
   * Toggles the video on/off state.
   */
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach(track => {
        track.enabled = !track.enabled
      })
      setIsVideoOff(!isVideoOff)
    }
  }

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex-1 relative bg-black rounded-lg overflow-hidden'>
        {/* Remote video (large) */}
        <div className='absolute inset-0'>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-cover ${
              remoteStream ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!remoteStream && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-white text-lg'>
                {isConnected 
                  ? 'Connecting to participant...' 
                  : 'Waiting for participant...'}
              </p>
            </div>
          )}
        </div>
        
        {/* Local video (small overlay) */}
        <div className='absolute bottom-4 right-4 w-1/4 aspect-video 
        bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg'>
          {deviceStatus.hasCamera && (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className='w-full h-full object-cover'
            />
          )}
          {(isVideoOff || !deviceStatus.hasCamera) && (
            <div className='absolute inset-0 flex items-center justify-center
            bg-gray-800 bg-opacity-80'>
              <p className='text-white text-sm text-center px-2'>
                {!deviceStatus.hasCamera 
                  ? 'No Camera Available' 
                  : 'Camera Off'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Device Status */}
      {deviceStatus.checking ? (
        <div className='mt-2 text-center text-sm text-gray-500'>
          Checking available devices...
        </div>
      ) : (
        <div className='mt-2 text-center text-sm text-gray-500 flex items-center justify-center'>
          {!deviceStatus.hasCamera && !deviceStatus.hasMicrophone ? (
            <>
              <span className='text-yellow-500'>
                No camera or microphone detected
              </span>
              <button 
                onClick={refreshDevices}
                className='ml-3 text-blue-500 hover:text-blue-700 text-sm underline'
              >
                Refresh Devices
              </button>
            </>
          ) : (
            <>
              {deviceStatus.hasCamera ? 
                'Camera available' : 
                <span className='text-yellow-500'>No camera</span>}
              {' • '}
              {deviceStatus.hasMicrophone ? 
                'Microphone available' : 
                <span className='text-yellow-500'>No microphone</span>}
              <button 
                onClick={refreshDevices}
                className='ml-3 text-blue-500 hover:text-blue-700 text-sm underline'
              >
                Refresh
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Controls */}
      <div className='mt-4 flex justify-center space-x-4'>
        {!isConnected ? (
          <button
            onClick={joinRoom}
            disabled={deviceStatus.checking}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 
            rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {deviceStatus.checking ? 'Checking Devices...' : 'Join Call'}
          </button>
        ) : (
          <>
            {deviceStatus.hasMicrophone && (
              <button
                onClick={toggleMute}
                className={`${
                  isMuted ? 'bg-red-500 hover:bg-red-600' : 
                  'bg-gray-500 hover:bg-gray-600'
                } text-white px-4 py-2 rounded-md`}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            )}
            
            {deviceStatus.hasCamera && (
              <button
                onClick={toggleVideo}
                className={`${
                  isVideoOff ? 'bg-red-500 hover:bg-red-600' : 
                  'bg-gray-500 hover:bg-gray-600'
                } text-white px-4 py-2 rounded-md`}
              >
                {isVideoOff ? 'Show Video' : 'Hide Video'}
              </button>
            )}
            
            <button
              onClick={leaveRoom}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 
              rounded-md'
            >
              Leave Call
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VideoCall