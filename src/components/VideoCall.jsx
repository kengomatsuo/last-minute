import { useEffect, useState, useRef, useCallback } from 'react'
import { useConsoleLog } from '../hooks'
import CustomButton from './CustomButton'

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
  const [audioOutputs, setAudioOutputs] = useState([])
  const [stream, setStream] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
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
  const stopVideoStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setStream(null)
      setIsStreaming(false)
    }
  }, [stream])

  /**
   * Cleans up stream when component unmounts
   */
  useEffect(() => {
    return () => {
      stopVideoStream()
    }
  }, [stopVideoStream])

  /**
   * Opens camera with specified settings
   *
   * @param {string} cameraId - The ID of the camera to use
   * @param {number} minWidth - Minimum width for the video
   * @param {number} minHeight - Minimum height for the video
   * @returns {Promise<MediaStream>} The media stream
   */
  const openCamera = async (cameraId, minWidth, minHeight) => {
    const constraints = {
      audio: {
        deviceId: activeMicrophoneId,
        echoCancellation: true,
      },
      video: {
        deviceId: cameraId,
        width: { min: minWidth },
        height: { min: minHeight },
      },
    }
    return await navigator.mediaDevices.getUserMedia(constraints)
  }

  /**
   * Toggles the video stream on/off
   */
  const toggleVideoStream = async () => {
    try {
      if (isStreaming) {
        stopVideoStream()
      } else {
        const newStream = await openCamera(activeCameraId, 1280, 720)
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
        }
        setStream(newStream)
        setIsStreaming(true)
      }
    } catch (error) {
      console.error('Error handling video stream:', error)
    }
  }

  /**
   * Handles camera selection change
   *
   * @param {Event} e - The change event
   */
  const handleCameraChange = async e => {
    const newCameraId = e.target.value
    setActiveCameraId(newCameraId)

    if (isStreaming) {
      stopVideoStream()
      const newStream = await openCamera(newCameraId, 1280, 720)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
      setStream(newStream)
      setIsStreaming(true)
    }
  }

  /**
    * Handles microphone selection change
    *
    * @param {Event} e - The change event
    */
    const handleMicrophoneChange = async e => {
     const newMicrophoneId = e.target.value
     setActiveMicrophoneId(newMicrophoneId)

     if (isStreaming) {
      stopVideoStream()
      const newStream = await openCamera(activeCameraId, 1280, 720)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
      setStream(newStream)
      setIsStreaming(true)
     }
    }

  return (
    <div className='bg-black flex-1 h-full relative flex justify-center items-center'>
      <video ref={videoRef} id='localVideo' autoPlay playsInline muted />

      <div className='absolute bottom-4 flex gap-4 bg-background p-2 rounded-lg max-w-11/12 overflow-auto'>
        <CustomButton onClick={toggleVideoStream} filled>
          {isStreaming ? 'Close Camera' : 'Open Camera'}
        </CustomButton>
        {videoInputs.length > 0 && (
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
        )}
        {audioInputs.length > 0 && (
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
        )}
      </div>
    </div>
  )
}

export default VideoCall
