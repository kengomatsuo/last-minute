import { useState, useEffect, useRef, useContext } from 'react'
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
import VideoCall from '../components/VideoCall'

/**
 * Video & chat session component that handles real-time messaging.
 *
 * @returns {JSX.Element} The session component
 */
const Session = () => {
  const { user } = useContext(UserContext)
  const { isSmallScreen } = useContext(ScreenContext)
  const [chatMessages, setChatMessages] = useState([])
  const [videoCallError, setVideoCallError] = useState(null)
  useConsoleLog('chatMessages', chatMessages)
  const formRef = useRef(null)
  const messageRef = useRef(null)
  const { search } = useLocation()
  const courseId = new URLSearchParams(search).get('course')

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

  /**
   * Handles sending a new chat message.
   *
   * @param {Event} e - Form submit event
   * @returns {Promise<void>}
   */
  const handleSendMessage = async e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    const messageText = data.message.trim()

    // cancel if the messageText is only whitespace
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

  /**
   * Handles video call errors.
   *
   * @param {string} errorMessage - The error message
   */
  const handleVideoCallError = (errorMessage) => {
    setVideoCallError(errorMessage)
    console.error('Video call error:', errorMessage)
  }

  return (
    <div
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='w-screen flex flex-row'
    >
      <div className='flex-1 flex'>
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 flex justify-center items-center bg-gray-100'>
            {videoCallError ? (
              <div className='text-red-500 p-4 rounded bg-red-50'>
                {videoCallError}
              </div>
            ) : (
              <VideoCall 
                courseId={courseId} 
                onError={handleVideoCallError} 
              />
            )}
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
