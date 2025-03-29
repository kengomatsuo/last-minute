import { useEffect, useState, useRef, useCallback } from 'react'
import { useConsoleLog } from '../hooks'
import CustomButton from './CustomButton'
import VideoIcon from '../assets/icons/video-camera-alt.svg?react'
import VideoSlashIcon from '../assets/icons/video-slash.svg?react'
import AudioIcon from '../assets/icons/microphone.svg?react'
import AudioSlashIcon from '../assets/icons/microphone-slash.svg?react'
import ScreenShareIcon from '../assets/icons/screen-share.svg?react'
import ScreenShareSlashIcon from '../assets/icons/laptop-slash.svg?react'
import { s } from 'framer-motion/client'
import CustomCard from './CustomCard'
import CustomInteractive from './CustomInteractive'
import CustomPopup from './CustomPopup'

/**
 * VideoCall component for handling video and audio streaming
 *
 * @param {Object} props - Component props
 * @param {string} props.courseId - The ID of the course
 * @returns {JSX.Element} The rendered video call component
 */
const VideoCall = ({ courseId }) => {
  const [videoInputs, setVideoInputs] = useState([])
  const [audioInputs, setAudioInputs] = useState([])
  useConsoleLog('audioInputs', audioInputs)
  const [audioOutputs, setAudioOutputs] = useState([])
  const [stream, setStream] = useState(null)
  const [isVideoStreaming, setIsVideoStreaming] = useState(false)
  const [isVideoStreamingLoading, setIsVideoStreamingLoading] = useState(false)
  const [isAudioStreaming, setIsAudioStreaming] = useState(false)
  const [isAudioStreamingLoading, setIsAudioStreamingLoading] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isScreenSharingLoading, setIsScreenSharingLoading] = useState(false)
  const videoRef = useRef(null)

  useConsoleLog('videoInputs', videoInputs)
  useConsoleLog('audioInputs', audioInputs)
  useConsoleLog('audioOutpus', audioOutputs)

  const [activeCameraId, setActiveCameraId] = useState('default')
  const [activeMicrophoneId, setActiveMicrophoneId] = useState('default')
  const [activeSpeakerId, setActiveSpeakerId] = useState('default')

  /**
   * Updates the available device lists
   */
  const updateDeviceLists = useCallback(async () => {
    console.log('Updating device lists...')
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      console.log('devices', devices)
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
      setIsVideoStreaming(false)
    }
    if (!audioInputs.length) {
      setIsAudioStreaming(false)
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
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setStream(null)
    }
  }, [stream])

  /**
   * Cleans up stream when component unmounts
   */
  useEffect(() => {
    return () => {
      stopStream()
    }
  }, [stopStream])

  /**
   * Opens camera with specified settings
   *
   * @param {string} cameraId - The ID of the camera to use
   * @param {number} width - Width for the video
   * @param {number} height - Height for the video
   * @returns {Promise<MediaStream>} The media stream
   */
  useEffect(() => {
    const updateStream = async () => {
      try {
        // Create a new stream if one doesn't exist yet
        if (!stream) {
          const newStream = new MediaStream()
          if (videoRef.current) {
            videoRef.current.srcObject = newStream
          }
          setStream(newStream)
        }

        // Handle video tracks only
        if (isScreenSharing) {
          try {
            // Stop any existing video tracks
            const existingVideoTracks = stream?.getVideoTracks() || []
            existingVideoTracks.forEach(track => {
              stream.removeTrack(track)
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
              stream.addTrack(track)

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
          const existingVideoTracks = stream?.getVideoTracks() || []
          existingVideoTracks.forEach(track => {
            stream.removeTrack(track)
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
            stream.addTrack(track)
          })
        } else {
          // If neither video nor screen sharing is active, stop any video tracks
          const existingVideoTracks = stream?.getVideoTracks() || []
          existingVideoTracks.forEach(track => {
            stream.removeTrack(track)
            track.stop()
          })
        }
      } catch (error) {
        console.error('Error updating video tracks:', error)
      } finally {
        setIsVideoStreamingLoading(false)
        setIsScreenSharingLoading(false)
      }
    }

    updateStream()
  }, [isVideoStreaming, isScreenSharing, activeCameraId, stream])

  // Separate effect for handling audio tracks only
  useEffect(() => {
    const updateAudioTrack = async () => {
      if (!stream) return

      try {
        // Handle audio tracks separately
        if (isAudioStreaming) {
          // Check if we already have an audio track
          const existingAudioTracks = stream.getAudioTracks() || []

          // Only get a new audio track if we don't have one or if the device changed
          if (
            existingAudioTracks.length === 0 ||
            existingAudioTracks[0].getSettings().deviceId !== activeMicrophoneId
          ) {
            // Remove existing audio tracks
            existingAudioTracks.forEach(track => {
              stream.removeTrack(track)
              track.stop()
            })

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
              stream.addTrack(track)
            })
          }
        } else {
          // If audio streaming is disabled, stop any audio tracks
          const existingAudioTracks = stream.getAudioTracks() || []
          existingAudioTracks.forEach(track => {
            stream.removeTrack(track)
            track.stop()
          })
        }
      } catch (error) {
        console.error('Error updating audio tracks:', error)
      } finally {
        setIsAudioStreamingLoading(false)
      }
    }

    updateAudioTrack()
  }, [isAudioStreaming, activeMicrophoneId, stream])

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

  const testMicrophone = async () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256

    try {
      const testStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: activeMicrophoneId },
      })
      const source = audioContext.createMediaStreamSource(testStream)
      source.connect(analyser)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      let hasSound = false

      const checkAudio = () => {
        analyser.getByteFrequencyData(dataArray)
        hasSound = dataArray.some(value => value > 10)
      }

      const interval = setInterval(checkAudio, 100)

      await new Promise(resolve => setTimeout(resolve, 1500))

      clearInterval(interval)
      testStream.getTracks().forEach(track => track.stop())

      if (!hasSound) {
        console.error('No sound detected from the microphone')
        return false
      }
      return true
    } catch (error) {
      console.error('Error testing microphone:', error)
      return false
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

    if (!isAudioStreaming && !(await testMicrophone())) {
      return
    }
    if (!isAudioStreaming) {
      setIsAudioStreamingLoading(true)
    }
    // toggle audio streaming
    setIsAudioStreaming(!isAudioStreaming)
  }

  const handleScreenSharingToggle = async () => {
    if (!isScreenSharing) {
      setIsScreenSharingLoading(true)
    }
    setIsVideoStreaming(false)
    setIsScreenSharing(!isScreenSharing)
  }

  return (
    <div className='bg-black flex-1 h-full w-full relative flex flex-col justify-center items-center'>
      <div className='flex flex-wrap gap-4 justify-center items-center w-full p-8'>
        <video
          ref={videoRef}
          id='localVideo'
          autoPlay
          playsInline
          className='bg-green-500 rounded-lg min-w-135 w-135 xl:w-[45%] aspect-video h-auto'
        />
        <video
          ref={videoRef}
          id='localVideo'
          autoPlay
          playsInline
          className='bg-red-500 rounded-lg min-w-135 w-135 xl:w-[45%] aspect-video h-auto'
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
      </div>
    </div>
  )
}

export default VideoCall
