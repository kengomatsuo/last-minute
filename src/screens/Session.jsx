import { useState, useEffect, useRef, useCallback } from 'react'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { CustomButton } from '../components'

/**
 * Video call session component that handles WebRTC connections.
 * 
 * @returns {JSX.Element} The session component
 */
const Session = () => {
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const pcRef = useRef(null)
  
  /**
   * Stops all tracks in the provided media stream.
   * 
   * @param {MediaStream} stream - The media stream to stop
   */
  const stopMediaTracks = useCallback((stream) => {
    if (!stream) {
      return
    }
    
    try {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    } catch (error) {
      console.error('Error stopping media tracks:', error)
    }
  }, [])

  useEffect(() => {
    // Configure ICE servers
    const servers = {
      iceServers: [
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ],
      iceCandidatePoolSize: 10,
    }

    // Initialize peer connection
    pcRef.current = new RTCPeerConnection(servers)
    
    // Initialize remote stream
    const remote = new MediaStream()
    setRemoteStream(remote)

    // Handle incoming tracks
    pcRef.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remote.addTrack(track)
      })
    }

    // Cleanup function
    return () => {
      if (pcRef.current) {
        pcRef.current.close()
      }
    }
  }, [])

  // Effect to clean up localStream when component unmounts or stream changes
  useEffect(() => {
    return () => {
      stopMediaTracks(localStream)
    }
  }, [localStream, stopMediaTracks])

  /**
   * Initiates a video call by accessing media devices and adding tracks.
   * 
   * @returns {Promise<void>}
   */
  const startCall = async () => {
    try {
      // Stop any existing streams before requesting new ones
      stopMediaTracks(localStream)
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      
      setLocalStream(stream)
      
      stream.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, stream)
      })
    } catch (error) {
      console.error('Error starting call:', error)
    }
  }

  return (
    <div style={{ paddingTop: NAVBAR_HEIGHT }}>
      <h1>Session</h1>
      <div>
        {localStream && (
          <video
            autoPlay
            playsInline
            muted
            ref={(videoElem) => {
              if (videoElem) {
                videoElem.srcObject = localStream
              }
            }}
            style={{ width: '300px', margin: '10px' }}
          />
        )}
        {remoteStream && (
          <video
            autoPlay
            playsInline
            ref={(videoElem) => {
              if (videoElem) {
                videoElem.srcObject = remoteStream
              }
            }}
            style={{ width: '300px', margin: '10px' }}
          />
        )}
      </div>
      <CustomButton onClick={startCall}>Start calling</CustomButton>
    </div>
  )
}

export default Session
