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
        if (stream) {
          console.log('Stream:', stream.getTracks())
          stopStream()
        }

        if (isScreenSharing) {
          try {
            console.log(navigator.mediaDevices.getSupportedConstraints())
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
              video: {
                cursor: 'always',
                frameRate: 24,
                resizeMode: 'none',
              },
              audio: isAudioStreaming
                ? {
                    deviceId: activeMicrophoneId,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                  }
                : false,
            })

            if (videoRef.current && videoRef.current.srcObject) {
              videoRef.current.srcObject
                .getTracks()
                .forEach(track => track.stop())
            }
            if (videoRef.current) {
              videoRef.current.srcObject = screenStream
            }

            setStream(screenStream)
          } catch (error) {
            setIsScreenSharing(false)
            throw error
          }
        } else if (isVideoStreaming || isAudioStreaming) {
          const newStream = await navigator.mediaDevices.getUserMedia({
            audio: isAudioStreaming
              ? {
                  deviceId: activeMicrophoneId,
                  echoCancellation: true,
                  noiseSuppression: true,
                  autoGainControl: true,
                }
              : false,
            video: isVideoStreaming
              ? {
                  deviceId: activeCameraId,
                  width: { ideal: 1280, max: 2560 },
                  height: { ideal: 720, max: 1440 },
                  frameRate: { min: 8, max: 24 },
                  resizeMode: 'none',
                }
              : false,
          })

          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject
              .getTracks()
              .forEach(track => track.stop())
          }
          if (videoRef.current) {
            videoRef.current.srcObject = newStream
          }

          setStream(newStream)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsVideoStreamingLoading(false)
        setIsAudioStreamingLoading(false)
        setIsScreenSharingLoading(false)
      }
    }
    updateStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAudioStreaming,
    isVideoStreaming,
    isScreenSharing,
    activeCameraId,
    activeMicrophoneId,
  ])

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
    setIsScreenSharing(!isScreenSharing)
  }

  return (
    <div className='bg-black flex-1 h-full relative flex justify-center items-center'>
      <video ref={videoRef} id='localVideo' autoPlay playsInline />

      <div className='absolute bottom-4 flex gap-2 bg-primary p-1 rounded-lg max-w-11/12 overflow-auto'>
        <CustomButton
          onClick={() => handleVideoToggle()}
          loading={isVideoStreamingLoading}
          filled
          className={`${
            isScreenSharing && !isScreenSharingLoading ? 'opacity-70' : ''
          } !p-2 flex aspect-square`}
        >
          {isVideoStreaming ? (
            <VideoIcon className=' w-6 h-6 fill-background' />
          ) : (
            <VideoSlashIcon className='w-6 h-6 fill-background' />
          )}
        </CustomButton>
        <CustomButton
          onClick={() => handleAudioToggle()}
          loading={isAudioStreamingLoading}
          filled
          className='!p-2 flex aspect-square'
        >
          {isAudioStreaming ? (
            <AudioIcon className=' w-6 h-6 fill-background' />
          ) : (
            <AudioSlashIcon className='w-6 h-6 fill-background' />
          )}
        </CustomButton>
        <div className='flex-1 w-0.5 bg-background-secondary' />
        <CustomButton
          onClick={() => handleScreenSharingToggle()}
          loading={isScreenSharingLoading}
          filled
          className='!p-2 flex aspect-square'
        >
          {isScreenSharing ? (
            <ScreenShareSlashIcon className=' w-6 h-6 fill-background' />
          ) : (
            <ScreenShareIcon className='w-6 h-6 fill-background' />
          )}
        </CustomButton>
        {/* {videoInputs.length > 0 && (
          <div>
            <label htmlFor='cameraSelect'>Camera: </label>
            <select
              id='cameraSelect'
              value={activeCameraId}
              onChange={handleCameraChange}
            >
              {videoInputs.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${videoInputs.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>
        )} */}
        {/* {audioInputs.length > 0 && (
          <div>
            <label htmlFor='microphoneSelect'>Microphone: </label>
            <select
              id='microphoneSelect'
              value={activeMicrophoneId}
              onChange={handleMicrophoneChange}
            >
              {audioInputs.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label ||
                    `Microphone ${audioInputs.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default VideoCall
