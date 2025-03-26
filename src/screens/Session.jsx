import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { CustomButton, CustomCard, CustomInput } from '../components'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useConsoleLog } from '../hooks'
import { UserContext } from '../contexts/UserContext'
import { ScreenContext } from '../contexts/ScreenContext'

/**
 * Video call session component that handles WebRTC connections and chat.
 *
 * @returns {JSX.Element} The session component
 */
const Session = () => {
  const { user } = useContext(UserContext)
  const { isSmallScreen } = useContext(ScreenContext)
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  useConsoleLog('chatMessages', chatMessages)
  const pcRef = useRef(null)
  const formRef = useRef(null)
  const messageRef = useRef(null)
  const { search } = useLocation()
  const courseId = new URLSearchParams(search).get('course')

  /**
   * Stops all tracks in the provided media stream.
   *
   * @param {MediaStream} stream - The media stream to stop
   */
  const stopMediaTracks = useCallback(stream => {
    if (!stream) {
      return
    }

    try {
      stream.getTracks().forEach(track => {
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
    pcRef.current.ontrack = event => {
      event.streams[0].getTracks().forEach(track => {
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

      stream.getTracks().forEach(track => {
        pcRef.current.addTrack(track, stream)
      })
    } catch (error) {
      console.error('Error starting call:', error)
    }
  }

  // Set up listener for chat messages
  useEffect(() => {
    if (!courseId) {
      return
    }

    const chatQuery = query(
      collection(db, 'courses', courseId, 'chat'),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(
      chatQuery,
      snapshot => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setChatMessages(messages)
      },
      error => {
        console.error('Error fetching chat messages:', error)
      }
    )

    // Clean up the listener when component unmounts
    return () => unsubscribe()
  }, [courseId])

  const handleSendMessage = async e => {
    // add a message to the chat subcollection
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    const messageText = data.message.trim()

    // cancel if the messageText is only whitespace (newlines, spaces, )
    if (!messageText) {
      return
    }

    try {
      await addDoc(collection(db, 'courses', courseId, 'chat'), {
        text: messageText,
        senderId: user.uid,
        createdAt: serverTimestamp(),
      })
      messageRef.current.reset()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='w-screen flex flex-row'
    >
      <div className='flex-1 flex'>
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 flex flex-row'>
            {!isSmallScreen && (
              <div className='flex-1 bg-black'>
                {localStream && (
                  <video
                    autoPlay
                    playsInline
                    muted
                    ref={videoElem => {
                      if (videoElem) {
                        videoElem.srcObject = localStream
                      }
                    }}
                    style={{ width: '300px', margin: '10px' }}
                  />
                )}
              </div>
            )}

            <div className='flex-1 bg-red-500'>
              {remoteStream && (
                <video
                  autoPlay
                  playsInline
                  ref={videoElem => {
                    if (videoElem) {
                      videoElem.srcObject = remoteStream
                    }
                  }}
                  style={{ width: '300px', margin: '10px' }}
                />
              )}
            </div>
          </div>
          <div className='px-4 py-2'>
            <CustomButton onClick={startCall}>Start calling</CustomButton>
          </div>
        </div>
      </div>
      <CustomCard header='Chat' className='min-w-xs max-w-sm'>
        <div className='h-full flex flex-col'>
          <div className='flex flex-1 flex-col overflow-y-auto'>
            {chatMessages.map(message => (
              <div key={message.id} className='mb-2'>
                <div className='text-sm font-semibold'>{message.senderId}</div>
                <div className='bg-gray-100 p-2 rounded'>{message.text}</div>
              </div>
            ))}
          </div>
          <form
            className='flex gap-2 items-center'
            ref={formRef}
            onSubmit={e => handleSendMessage(e)}
          >
            <CustomInput ref={messageRef} name='message' type='text' />
            <CustomButton type='submit'>Send</CustomButton>
          </form>
        </div>
      </CustomCard>
    </div>
  )
}

export default Session
