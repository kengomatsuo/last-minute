import { useEffect, useState, useRef, useCallback } from 'react'
import { useConsoleLog } from '../hooks'
import CustomButton from './CustomButton'
import VideoIcon from '../assets/icons/video-camera-alt.svg?react'
import VideoSlashIcon from '../assets/icons/video-slash.svg?react'
import AudioIcon from '../assets/icons/microphone.svg?react'
import AudioSlashIcon from '../assets/icons/microphone-slash.svg?react'

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
  const [isVideoStreaming, setIsVideoStreaming] = useState(false)
  const [isAudioStreaming, setIsAudioStreaming] = useState(false)
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
        if (isVideoStreaming || isAudioStreaming) {
          const constraints = {
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
                  width: 1920,
                  height: 1080,
                }
              : false,
          }
          const newStream = await navigator.mediaDevices.getUserMedia(
            constraints
          )
          if (videoRef.current) {
            videoRef.current.srcObject = newStream
          }
          setStream(newStream)
        }
      } catch (error) {
        console.error('Error opening camera:', error)
      }
    }
    updateStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAudioStreaming, isVideoStreaming, activeCameraId, activeMicrophoneId])

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

  return (
    <div className='bg-black flex-1 h-full relative flex justify-center items-center'>
      <video ref={videoRef} id='localVideo' autoPlay playsInline muted />

      <div className='absolute bottom-4 flex gap-4 bg-primary p-1 rounded-lg max-w-11/12 overflow-auto'>
        <CustomButton
          onClick={() => setIsVideoStreaming(!isVideoStreaming)}
          filled
          className='!p-2 flex aspect-square'
        >
          {isVideoStreaming ? (
            <VideoIcon className=' w-6 h-6 fill-background' />
          ) : (
            <VideoSlashIcon className='w-6 h-6 fill-background' />
          )}
        </CustomButton>
        <CustomButton
          onClick={() => setIsAudioStreaming(!isAudioStreaming)}
          filled
          className='!p-2 flex aspect-square'
        >
          {isAudioStreaming ? (
            <AudioIcon className=' w-6 h-6 fill-background' />
          ) : (
            <AudioSlashIcon className='w-6 h-6 fill-background' />
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
