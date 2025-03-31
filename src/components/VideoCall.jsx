import { useEffect, useState, useRef, useCallback, useContext } from 'react'
import CustomButton from './CustomButton'
import VideoIcon from '../assets/icons/video-camera-alt.svg?react'
import VideoSlashIcon from '../assets/icons/video-slash.svg?react'
import AudioIcon from '../assets/icons/microphone.svg?react'
import AudioSlashIcon from '../assets/icons/microphone-slash.svg?react'
import ScreenShareIcon from '../assets/icons/screen-share.svg?react'
import CallIcon from '../assets/icons/phone-call.svg?react'
import LeaveIcon from '../assets/icons/leave.svg?react'
import CustomInteractive from './CustomInteractive'
import CustomPopup from './CustomPopup'
import { doc, setDoc } from 'firebase/firestore'
import PropTypes from 'prop-types'
import { db } from '../../firebaseConfig'
import { CourseContext } from '../contexts/CourseContext'
import { UserContext } from '../contexts/UserContext'
import { useConsoleLog } from '../hooks'

/**
 * VideoCall component for handling video and audio streaming
 *
 * @param {Object} props - Component props
 * @param {string} props.courseId - The ID of the course
 * @returns {JSX.Element} The rendered video call component
 */
const VideoCall = ({ courseId }) => {
  // TODO!!: clean up the code

  const { courses } = useContext(CourseContext)
  const { user } = useContext(UserContext)

  const course = courses.find(course => course.id === courseId)

  const [videoInputs, setVideoInputs] = useState([])
  const [audioInputs, setAudioInputs] = useState([])
  const [audioOutputs, setAudioOutputs] = useState([])
  const stream = useRef()
  const [isVideoStreaming, setIsVideoStreaming] = useState(false)
  useConsoleLog('isVideoStreaming', isVideoStreaming)
  const [isVideoStreamingLoading, setIsVideoStreamingLoading] = useState(false)
  const [isAudioStreaming, setIsAudioStreaming] = useState(false)
  const [isAudioStreamingLoading, setIsAudioStreamingLoading] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isScreenSharingLoading, setIsScreenSharingLoading] = useState(false)

  const peerConnection = useRef(null)
  const videoSender = useRef(null)
  const audioSender = useRef(null)
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const [activeCameraId, setActiveCameraId] = useState('default')
  const [activeMicrophoneId, setActiveMicrophoneId] = useState('default')
  const [activeSpeakerId, setActiveSpeakerId] = useState('default')

  const [isCalling, setIsCalling] = useState(false)

  const createStream = () => {
    if (stream.current) {
      return stream.current
    }
    const newStream = new MediaStream()
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = newStream
    }
    stream.current = newStream
    return stream.current
  }

  /**
   * Updates the available device lists
   */
  const updateDeviceLists = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      setVideoInputs(devices.filter(device => device.kind === 'videoinput'))
      setAudioInputs(devices.filter(device => device.kind === 'audioinput'))
      setAudioOutputs(devices.filter(device => device.kind === 'audiooutput'))
    } catch (error) {
      console.error('Error enumerating devices:', error)
    }
  }, [])

  // disable video and audio buttons if no devices are available
  useEffect(() => {
    if (!videoInputs.length) {
      null
    }
    if (!audioInputs.length) {
      updateAudioTrack(isAudioStreaming)
    }
  }, [videoInputs, audioInputs])

  useEffect(() => {
    updateDeviceLists()
    const handleDeviceChange = () => updateDeviceLists()
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)

    return () => {
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        handleDeviceChange
      )
    }
  }, [updateDeviceLists])

  /**
   * Stops all tracks in the current stream and cleans up
   */
  const stopStream = useCallback(() => {
    if (stream.current) {
      stream.current.getTracks().forEach(track => track.stop())
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null
      }
      stream.current = null
    }
  }, [])

  /**
   * Cleans up stream when component unmounts
   */
  useEffect(() => {
    return () => {
      stopStream()
    }
  }, [stopStream])

  /**
   * Replaces the current video track with a new one
   *
   * @param {MediaStreamTrack} newTrack - The new video track to use
   * @returns {Promise<void>}
   */
  const replaceVideoTrack = async newTrack => {
    if (!peerConnection.current || !videoSender.current) {
      throw new Error('No active connection or video sender available')
    }

    try {
      console.log('Replacing video track:', newTrack)
      await videoSender.current.replaceTrack(newTrack)
      console.log('Video track replaced successfully')
    } catch (error) {
      throw new Error(`Error replacing video track: ${error.message}`)
    }
  }

  /**
   * Replaces the current audio track with a new one
   *
   * @param {MediaStreamTrack} newTrack - The new audio track to use
   * @returns {Promise<void>}
   */
  const replaceAudioTrack = async newTrack => {
    console.log('Replacing audio track')
    if (!peerConnection.current || !audioSender.current) {
      throw new Error('No active connection or audio sender available')
    }

    try {
      console.log('Replacing audio track:', newTrack)
      await audioSender.current.replaceTrack(newTrack)
      console.log('Audio track replaced successfully')
    } catch (error) {
      throw new Error(`Error replacing audio track: ${error}`)
    }
  }

  /**
   * Opens camera with specified settings
   *
   * @param {string} cameraId - The ID of the camera to use
   * @param {number} width - Width for the video
   * @param {number} height - Height for the video
   * @returns {Promise<MediaStream>} The media stream
   */
  const updateVideoTrack = async () => {
    try {
      // Create a new stream if one doesn't exist yet
      if (!stream.current) {
        createStream()
      }

      // Handle video tracks only
      if (isScreenSharing) {
        try {
          // Stop any existing video tracks
          const existingVideoTracks = stream.current?.getVideoTracks() || []
          existingVideoTracks.forEach(track => {
            if (track._interval) {
              clearInterval(track._interval)
            }
            if (track._canvas) {
              track._canvas.remove()
            }
            console.log('Removing existing video track:', track)
            stream.current.removeTrack(track)
            track.stop()
          })

          // Get new screen sharing track
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              cursor: 'always',
              frameRate: 24,
              resizeMode: 'none',
            },
            audio: false, // Handle audio separately
          })

          // Add screen track to the existing stream
          screenStream.getVideoTracks().forEach(track => {
            console.log('Adding screen sharing track:', track)
            stream.current.addTrack(track)

            // Handle when user stops screen sharing via browser UI
            track.onended = () => {
              setIsScreenSharing(false)
            }
          })
        } catch (error) {
          setIsScreenSharing(false)
          throw error
        }
      } else if (isVideoStreaming) {
        // Stop any existing video tracks
        const existingVideoTracks = stream.current?.getVideoTracks() || []
        existingVideoTracks.forEach(track => {
          if (track._interval) {
            clearInterval(track._interval)
          }
          if (track._canvas) {
            track._canvas.remove()
          }
          console.log('Removing existing video track:', track)
          stream.current.removeTrack(track)
          track.stop()
        })

        // Get new camera video track
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: activeCameraId,
            width: { ideal: 1280, max: 2560 },
            height: { ideal: 720, max: 1440 },
            frameRate: { min: 8, max: 24 },
            resizeMode: 'none',
          },
        })

        // Add camera track to the existing stream
        videoStream.getVideoTracks().forEach(track => {
          console.log('Adding camera track:', track)
          stream.current.addTrack(track)
        })
      } else {
        // If neither video nor screen sharing is active, stop any video tracks
        const existingVideoTracks = stream.current?.getVideoTracks() || []
        existingVideoTracks.forEach(track => {
          stream.current.removeTrack(track)
          track.stop()
        })

        // Create a dummy video track if no video track exists
        createDummyVideoTrack()
      }

      if (peerConnection.current && videoSender.current) {
        const newVideoTrack = stream.current.getVideoTracks()[0]
        console.log('New video track:', newVideoTrack)
        if (newVideoTrack) {
          await replaceVideoTrack(newVideoTrack)
        }
      }
    } catch (error) {
      console.error('Error updating video tracks:', error)
      createDummyVideoTrack()
      // If we have a peer connection, replace the video track
      if (peerConnection.current && videoSender.current) {
        const newVideoTrack = stream.current.getVideoTracks()[0]
        if (newVideoTrack) {
          await replaceVideoTrack(newVideoTrack)
        }
      }
      setIsVideoStreaming(false)
    } finally {
      setIsVideoStreamingLoading(false)
      setIsScreenSharingLoading(false)
    }
  }

  useEffect(() => {
    updateVideoTrack()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoStreaming, isScreenSharing, activeCameraId])

  const updateAudioTrack = async state => {
    if (!stream.current || isAudioStreamingLoading) return

    try {
      setIsAudioStreamingLoading(true)

      console.log('Testing microphone:', activeMicrophoneId)
      console.log('Audio streaming state:', state)

      if (state === true) {
        await testMicrophone()
      }
      // Check if we already have an audio track
      const existingAudioTracks = stream.current.getAudioTracks() || []

      // Remove existing audio tracks if we're changing devices
      existingAudioTracks.forEach(track => {
        stream.current.removeTrack(track)
        track.stop()
      })

      // Only get a new audio track if we don't have one or if the device changed
      if (state === true) {
        // Get new audio track
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: activeMicrophoneId,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        })

        // Add audio track to the existing stream
        audioStream.getAudioTracks().forEach(track => {
          track.enabled = true
          console.log('Adding audio track:', track)
          stream.current.addTrack(track)
        })
      } else {
        createDummyAudioTrack()
      }

      // If we have a peer connection, replace the audio track
      if (peerConnection.current && audioSender.current) {
        const newAudioTrack = stream.current.getAudioTracks()[0]
        if (newAudioTrack) {
          await replaceAudioTrack(newAudioTrack)
        }
      }

      setIsAudioStreaming(state)
    } catch (error) {
      console.error('Error updating audio tracks:', error)
      createDummyAudioTrack()
      // If we have a peer connection, replace the audio track
      if (peerConnection.current && audioSender.current) {
        const newAudioTrack = stream.current.getAudioTracks()[0]
        if (newAudioTrack) {
          await replaceAudioTrack(newAudioTrack)
        }
      }
      setIsAudioStreaming(false)
    } finally {
      setIsAudioStreamingLoading(false)
    }
  }

  // Separate effect for handling audio tracks only
  useEffect(() => {
    if (stream) {
      // updateVideoTrack(isVideoStreaming)
      updateAudioTrack(isAudioStreaming)
    }
  }, [stream])

  /**
   * Handles camera selection change
   *
   * @param {Event} e - The change event
   */
  const handleCameraChange = async e => {
    const newCameraId = e.target.value
    setActiveCameraId(newCameraId)
  }

  /**
   * Handles microphone selection change
   *
   * @param {Event} e - The change event
   */
  const handleMicrophoneChange = async e => {
    const newMicrophoneId = e.target.value
    setActiveMicrophoneId(newMicrophoneId)
  }

  /**
   * Tests if the selected microphone is capturing audio
   *
   * @returns {Promise<boolean>} True if sound is detected, false otherwise
   */
  const testMicrophone = async () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256

    const testStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: activeMicrophoneId },
    })
    const source = audioContext.createMediaStreamSource(testStream)

    try {
      source.connect(analyser)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      let hasSound = false
      let testCompleted = false

      // Create a promise that resolves when sound is detected or timeout occurs
      const soundDetectionPromise = new Promise(resolve => {
        const checkAudio = () => {
          if (testCompleted) return

          analyser.getByteFrequencyData(dataArray)
          const soundDetected = dataArray.some(value => value > 10)

          if (soundDetected) {
            hasSound = true
            testCompleted = true
            resolve()
          }
        }

        const interval = setInterval(checkAudio, 100)

        // Set timeout to stop checking after 5 seconds
        setTimeout(() => {
          if (!testCompleted) {
            testCompleted = true
            clearInterval(interval)
            resolve()
          }
        }, 5000)
      })

      await soundDetectionPromise

      if (!hasSound) {
        console.error('No sound detected from the microphone. Cleaning up...')
        throw new Error('No sound detected from the microphone')
      }
      return
    } finally {
      testStream.getTracks().forEach(track => track.stop())
      audioContext.suspend()
      audioContext.close()
      analyser.disconnect()
      source.disconnect()
    }
  }

  const handleVideoToggle = async () => {
    if (!videoInputs.length) {
      console.error('No camera detected.')
      return
    }
    if (!isVideoStreaming && !isAudioStreaming) {
      setIsVideoStreamingLoading(true)
    }
    setIsScreenSharing(false)
    setIsVideoStreaming(!isVideoStreaming)
  }

  const handleAudioToggle = async () => {
    if (!audioInputs.length) {
      console.error('No audio input detected')
      return
    }
    await updateAudioTrack(!isAudioStreaming)
  }

  const handleScreenSharingToggle = async () => {
    if (!isScreenSharing) {
      setIsScreenSharingLoading(true)
    }
    setIsVideoStreaming(false)
    setIsScreenSharing(!isScreenSharing)
  }

  const config = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ],
    iceCandidatePoolSize: 10,
  }

  const createPeerConnection = () => {
    console.log('Creating peer connection...')
    const newPeerConnection = new RTCPeerConnection(config)
    console.log('Peer connection created:', newPeerConnection)
    peerConnection.current = newPeerConnection

    peerConnection.current.oniceconnectionstatechange = () => {
      if (peerConnection.current.iceConnectionState === 'disconnected') {
        console.log('Disconnected from peer')
        stopStream()
      } else if (peerConnection.current.iceConnectionState === 'connected') {
        console.log('Connected to peer')
      } else if (peerConnection.current.iceConnectionState === 'failed') {
        console.error('Connection failed')
        stopStream()
      }
    }
    peerConnection.current.ontrack = event => {
      console.log('Remote track received:', event.track.kind)
      const remoteStream = event.streams[0]
      if (remoteVideoRef.current) {
        console.log('Setting remote stream to video element')
        remoteVideoRef.current.srcObject = remoteStream
      }
      remoteStream.getTracks().forEach(track => {
        console.log(
          'Remote track details:',
          track.kind,
          track.enabled,
          track.muted
        )
        track.onended = () => {
          console.log('Remote track ended')
          stopStream()
        }
      })
    }
    console.log('Peer connection listeners set up')
    return peerConnection.current
  }

  const createDummyAudioTrack = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    const destination = audioContext.createMediaStreamDestination()
    oscillator.connect(destination)
    oscillator.start()

    const dummyAudioTrack = destination.stream.getAudioTracks()[0]
    dummyAudioTrack.enabled = false
    stream.current.addTrack(dummyAudioTrack)
    console.log(
      'Dummy audio track created and added to stream:',
      dummyAudioTrack
    )
  }

  const createDummyVideoTrack = () => {
    // Store canvas in a wider scope or as a class property
    const canvas = document.createElement('canvas')
    canvas.width = 1280
    canvas.height = 720
    const ctx = canvas.getContext('2d')

    // Draw initial grey rectangle
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some text or identifier
    ctx.fillStyle = 'white'
    ctx.font = '40px Arial'
    const text = user.displayName || 'Anonymous'
    const textWidth = ctx.measureText(text).width
    ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2)

    // Set up continuous drawing to ensure stream remains active
    const drawInterval = setInterval(() => {
      // Add a small element that changes to ensure the stream is active
      const date = new Date()
      ctx.clearRect(0, canvas.height - 40, canvas.width, 40)
      ctx.fillStyle = 'grey'
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40)
      ctx.fillStyle = 'white'
      ctx.font = '20px Arial'
      ctx.fillText(date.toLocaleTimeString(), 20, canvas.height - 15)
    }, 1000)

    // Capture at a higher framerate
    const videoStream = canvas.captureStream(8) // 5 FPS instead of 1
    const dummyVideoTrack = videoStream.getVideoTracks()[0]

    // Store references to allow cleanup later
    dummyVideoTrack._canvas = canvas
    dummyVideoTrack._interval = drawInterval
    dummyVideoTrack.onended = () => {
      clearInterval(drawInterval)
    }

    stream.current.addTrack(dummyVideoTrack)
    console.log(
      'Dummy video track created and added to stream:',
      dummyVideoTrack
    )

    return dummyVideoTrack
  }

  /**
   * Ensures stream has at least one track, adding a muted audio track if needed
   *
   * @param {MediaStream} stream - The media stream to validate
   * @param {string} microphoneId - ID of the microphone to use if needed
   * @returns {Promise<boolean>} True if stream has tracks after validation
   */
  const ensureStreamHasTracks = async () => {
    if (!stream.current) {
      createStream()
    }

    if (stream.current.getTracks().length < 2) {
      console.warn(
        'Not enough tracks in stream. Creating dummy audio or video track...'
      )

      // // Create a dummy audio track if no audio track exists
      // if (stream.current.getAudioTracks().length === 0) {
      //   createDummyAudioTrack()
      // }
      // // Create a dummy video track if no video track exists
      // if (stream.current.getVideoTracks().length === 0) {
      //   createDummyVideoTrack()
      // }

      // Wait for tracks to be available
      await new Promise(resolve => {
        const checkForTracks = () => {
          if (stream.current && stream.current.getTracks().length > 0) {
            console.log(
              'Tracks acquired successfully:',
              stream.current.getTracks()
            )
            resolve()
          } else {
            setTimeout(checkForTracks, 500)
          }
        }

        checkForTracks()
        setTimeout(() => resolve(), 10000)
      })
    }

    if (!stream.current.getTracks().length) {
      throw new Error('Failed to acquire tracks')
    }

    console.log('Tracks acquired successfully:', stream.current.getTracks())
  }

  /**
   * Makes a WebRTC call to the remote peer
   *
   * @returns {Promise<void>} A promise that resolves when the call is set up
   */
  const makeCall = async () => {
    try {
      console.log('Making call...')
      createPeerConnection()

      if (!peerConnection.current) {
        console.error('Failed to create peer connection')
        throw new Error('Failed to create peer connection')
      }

      peerConnection.current.addTransceiver('video', { direction: 'recvonly' })
      peerConnection.current.addTransceiver('audio', { direction: 'recvonly' })

      // Ensure stream has tracks before proceeding
      await ensureStreamHasTracks()

      setIsCalling(true)
      console.log('Adding local stream to peer connection:', stream.current)
      stream.current.getTracks().forEach(track => {
        console.log('Adding track:', track)
        const sender = peerConnection.current.addTrack(track, stream.current)

        if (track.kind === 'video') {
          videoSender.current = sender
          console.log('Video sender added:', sender)
        }
        if (track.kind === 'audio') {
          audioSender.current = sender
          console.log('Audio sender added:', sender)
        }
      })

      console.log('Video and audio senders added:', {
        videoSender: videoSender.current,
        audioSender: audioSender.current,
      })

      if (!videoSender.current || !audioSender.current) {
        throw new Error('Failed to add video or audio sender')
      }
      console.log('Local stream added to peer connection')

      // ICE candidates listener
      let iceCandidates = []
      peerConnection.current.onicecandidate = async event => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate)
          iceCandidates.push(event.candidate)
        }
      }
      console.log('ICE candidates listener set up')

      const offer = await peerConnection.current.createOffer()
      await peerConnection.current.setLocalDescription(offer)
      console.log('Local description set with offer')

      // Wait for ICE gathering with timeout
      await gatherIceCandidatesWithTimeout(iceCandidates)

      if (!iceCandidates.length) {
        console.error('No ICE candidates found')
        throw new Error('No ICE candidates found')
      }

      console.log(peerConnection.current.localDescription)
      if (
        !peerConnection.current.localDescription.sdp.includes('a=candidate:')
      ) {
        console.error('No ICE candidates found in local description')
        throw new Error('No ICE candidates found in local description')
      }
      console.log('ICE candidates found in local description')

      // serialize local description
      const serializedOffer = {
        type: peerConnection.current.localDescription.type,
        sdp: peerConnection.current.localDescription.sdp,
      }
      console.log('Serialized offer:', serializedOffer)

      await setDoc(
        doc(db, 'courses', courseId),
        { offer: serializedOffer },
        { merge: true }
      )
      console.log('Offer sent successfully')
    } catch (error) {
      console.error('Error making call:', error)
    } finally {
      setIsCalling(false)
    }
  }

  /**
   * Answers an incoming WebRTC call
   *
   * @returns {Promise<void>} A promise that resolves when the call is answered
   */
  const answerCall = async () => {
    try {
      console.log('Answering call...')
      createPeerConnection()

      if (!peerConnection.current) {
        console.error('Failed to create peer connection')
        throw new Error('No peer connection available')
      }

      if (!course?.offer) {
        console.error('No offer available to answer')
        throw new Error('No offer available to answer')
      }

      // Ensure stream has tracks before proceeding
      await ensureStreamHasTracks()

      setIsCalling(true)
      console.log('Adding local stream to peer connection:', stream.current)
      stream.current.getTracks().forEach(track => {
        console.log('Adding track:', track)
        const sender = peerConnection.current.addTrack(track, stream.current)

        if (track.kind === 'video') {
          videoSender.current = sender
          console.log('Video sender added:', sender)
        }
        if (track.kind === 'audio') {
          audioSender.current = sender
          console.log('Audio sender added:', sender)
        }
      })

      if (!videoSender.current || !audioSender.current) {
        throw new Error('Failed to add video or audio sender')
      }
      console.log('Video and audio senders added:', {
        videoSender: videoSender.current,
        audioSender: audioSender.current,
      })
      console.log('Local stream added to peer connection')

      // Set the remote description from the offer
      await peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(course.offer)
      )
      console.log('Remote description set from offer')

      // ICE candidates listener
      let iceCandidates = []
      peerConnection.current.onicecandidate = async event => {
        if (event.candidate) {
          console.log('ICE candidate:', event.candidate)
          iceCandidates.push(event.candidate)
        }
      }
      console.log('ICE candidates listener set up')

      // Create an answer
      const answer = await peerConnection.current.createAnswer()
      await peerConnection.current.setLocalDescription(answer)
      console.log('Local description set with answer')

      // Wait for ICE gathering with timeout
      await gatherIceCandidatesWithTimeout(iceCandidates)

      if (!iceCandidates.length) {
        console.error('No ICE candidates found')
        throw new Error('No ICE candidates found')
      }

      // Check if candidates are in the SDP
      if (
        !peerConnection.current.localDescription.sdp.includes('a=candidate:')
      ) {
        console.error('No ICE candidates found in local description')
        throw new Error('No ICE candidates found in local description')
      }
      console.log('ICE candidates found in local description')

      // Serialize the answer
      const serializedAnswer = {
        type: peerConnection.current.localDescription.type,
        sdp: peerConnection.current.localDescription.sdp,
      }
      console.log('Serialized answer:', serializedAnswer)

      await setDoc(
        doc(db, 'courses', courseId),
        { answer: serializedAnswer },
        { merge: true }
      )
      console.log('Answer sent successfully')
    } catch (error) {
      console.error('Error answering call:', error)
    } finally {
      setIsCalling(false)
    }
  }

  useEffect(() => {
    const applyAnswer = async () => {
      if (
        user?.claims.isTutor &&
        course?.answer &&
        peerConnection.current &&
        peerConnection.current.signalingState === 'have-local-offer'
      ) {
        try {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(course.answer)
          )
          console.log('Remote answer set successfully')
        } catch (error) {
          console.error('Failed to set remote answer:', error)
        }
      }
    }

    applyAnswer()
  }, [course?.answer, user?.claims.isTutor])

  /**
   * Handles ICE gathering with timeout
   *
   * @param {RTCPeerConnection} peerConnection - The WebRTC peer connection
   * @param {Array} iceCandidates - Array to store ICE candidates
   * @param {number} timeoutMs - Timeout in milliseconds
   * @returns {Promise<void>} Resolves when gathering is complete or times out
   */
  const gatherIceCandidatesWithTimeout = (iceCandidates, timeoutMs = 5000) => {
    return new Promise((resolve, reject) => {
      // Track if we've already resolved/rejected
      let isResolved = false

      // Handler for ICE gathering state changes
      peerConnection.current.onicegatheringstatechange = () => {
        if (isResolved) return

        if (peerConnection.current.iceGatheringState === 'complete') {
          console.log('ICE gathering complete')
          console.log('ICE candidates:', iceCandidates)
          isResolved = true
          resolve()
        } else {
          console.log(
            'ICE gathering state:',
            peerConnection.current.iceGatheringState
          )
        }
      }

      // Set timeout to ensure we don't wait indefinitely
      const timeoutId = setTimeout(() => {
        if (isResolved) return

        isResolved = true
        console.warn(`ICE gathering timed out after ${timeoutMs}ms`)

        // If we have at least one candidate, resolve anyway
        if (iceCandidates.length > 0) {
          console.log(
            'Proceeding with available candidates:',
            iceCandidates.length
          )
          resolve()
        } else {
          reject(new Error('ICE gathering timed out with no candidates'))
        }
      }, timeoutMs)

      // Cleanup timeout if resolved naturally
      peerConnection.current.addEventListener(
        'icegatheringstatechange',
        () => {
          if (peerConnection.current.iceGatheringState === 'complete') {
            clearTimeout(timeoutId)
          }
        },
        { once: true }
      )
    })
  }

  const endCall = async () => {
    if (peerConnection.current) {
      peerConnection.current.close()
    }
    await setDoc(
      doc(db, 'courses', courseId),
      { offer: null, answer: null },
      { merge: true }
    )
  }

  return (
    <div className='bg-black flex-1 h-full w-full relative flex flex-col justify-center items-center'>
      <div className='flex flex-wrap gap-4 justify-center items-center w-full p-8'>
        <video
          ref={localVideoRef}
          id='localVideo'
          autoPlay
          playsInline
          muted
          className='rounded-lg min-w-135 w-135 xl:w-[45%] aspect-video h-auto'
        />
        <video
          ref={remoteVideoRef}
          id='remoteVideo'
          autoPlay
          playsInline
          className='rounded-lg min-w-135 w-135 xl:w-[45%] aspect-video h-auto'
        />
      </div>
      <div className='absolute bottom-4 flex gap-1 bg-[#faf9f5] p-2 rounded-lg min-w-fit max-w-11/12'>
        <CustomButton
          onClick={() => handleAudioToggle()}
          loading={isAudioStreamingLoading}
          popup={<CustomPopup>Sup</CustomPopup>}
          className='flex !bg-background-secondary/10 !border-none transition-none'
        >
          {isAudioStreaming ? (
            <AudioIcon className=' w-6 h-6 fill-primary' />
          ) : (
            <AudioSlashIcon className='w-6 h-6 fill-primary' />
          )}
        </CustomButton>
        <CustomButton
          onClick={() => handleVideoToggle()}
          loading={isVideoStreamingLoading}
          popup={<CustomPopup></CustomPopup>}
          className='flex !bg-background-secondary/10 !border-none transition-none'
        >
          {isVideoStreaming ? (
            <VideoIcon className=' w-6 h-6 fill-primary' />
          ) : (
            <VideoSlashIcon className='w-6 h-6 fill-primary' />
          )}
        </CustomButton>

        {/* Spacer */}
        <div className='flex-1 mx-2 min-w-[1px] bg-primary/40' />
        {/* Spacer */}

        <CustomInteractive
          onClick={() => handleScreenSharingToggle()}
          loading={isScreenSharingLoading}
          className={`${
            isScreenSharing && !isScreenSharingLoading
              ? '!bg-primary'
              : '!bg-background-secondary/10'
          } !p-2 items-center justify-center flex active:!bg-primary/25`}
        >
          <ScreenShareIcon
            className={`${
              isScreenSharing && !isScreenSharingLoading
                ? 'animate-pulse fill-success'
                : 'fill-primary'
            } w-6 h-6`}
          />
        </CustomInteractive>

        {/* Spacer */}
        <div className='flex-1 mx-2 min-w-[1px] bg-primary/40' />
        {/* Spacer */}

        <CustomButton
          onClick={() =>
            (user?.claims.isTutor && course?.offer) || course?.answer
              ? endCall()
              : user?.claims.isTutor
              ? makeCall()
              : answerCall()
          }
          disabled={!user?.claims.isTutor && !course?.offer}
          loading={isCalling}
          className={`${
            (user?.claims.isTutor && course?.offer) ||
            (!user?.claims.isTutor && course?.answer)
              ? '!bg-red-500'
              : '!bg-green-500'
          } flex !p-2 !border-none transition-none`}
        >
          {(user?.claims.isTutor && course?.offer) ||
          (!user?.claims.isTutor && course?.answer) ? (
            <LeaveIcon className=' w-6 h-6 fill-white' />
          ) : (
            <CallIcon className='w-6 h-6 fill-white' />
          )}
        </CustomButton>
      </div>
    </div>
  )
}
VideoCall.propTypes = {
  courseId: PropTypes.string.isRequired,
}

export default VideoCall
