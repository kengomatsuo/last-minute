import { useState, useEffect, useRef, useContext, memo } from 'react'
import { CustomButton, CustomInput, CustomCard } from './'
import LoadingDots from './LoadingDots'
import PropTypes from 'prop-types'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { UserContext } from '../contexts/UserContext'
import { motion, AnimatePresence } from 'framer-motion'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'

/**
 * Custom hook for managing optimistic timestamps in chat messages
 *
 * @param {Array} chatMessages - The current chat messages
 * @returns {Array} Updated messages with optimistic timestamps
 */
const useOptimisticTimestamp = chatMessages => {
  return chatMessages.map(message => {
    if (message.createdAt) {
      return message
    }

    // For messages without a timestamp (still pending), use client-side time
    return {
      ...message,
      optimisticCreatedAt: new Date(),
    }
  })
}

/**
 * Chat component that handles real-time messaging.
 *
 * @param {Object} props - Component props
 * @param {string} props.courseId - The ID of the course
 * @param {Object} props.courseData - Data about the course
 * @returns {JSX.Element} The chat component
 */
const ChatComponent = memo(function ChatComponent({ courseId, courseData }) {
  const { user } = useContext(UserContext)

  const [chatMessages, setChatMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const formRef = useRef(null)
  const messageRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Apply optimistic timestamps to messages
  const messagesWithOptimisticTimestamps = useOptimisticTimestamp(chatMessages)

  // Set up listener for chat messages
  useEffect(() => {
    if (!courseId) {
      return
    }

    setIsLoading(true)

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
        setIsLoading(false)
      },
      error => {
        console.error('Error fetching chat messages:', error)
        setIsLoading(false)
      }
    )

    // Clean up the listener when component unmounts
    return () => unsubscribe()
  }, [courseId])

  // Auto-scroll to bottom when new messages arrive with smooth animation
  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: isInitialRender ? 'auto' : 'smooth',
        })
        
        // Set initial render to false after first scroll
        if (isInitialRender && !isLoading) {
          setIsInitialRender(false)
        }
      }

      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(scrollToBottom, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [chatMessages, isInitialRender, isLoading])

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

    // Create optimistic message with client timestamp
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      senderId: user.uid,
      optimisticCreatedAt: new Date(),
    }

    // Optimistically update the UI
    setChatMessages(prev => [...prev, optimisticMessage])

    try {
      await addDoc(collection(db, 'courses', courseId, 'chat'), {
        text: messageText,
        senderId: user.uid,
        createdAt: serverTimestamp(),
      })
      // Clear input with animation
      messageRef.current.reset()
    } catch (error) {
      // Remove optimistic message on error
      setChatMessages(prev =>
        prev.filter(msg => msg.id !== optimisticMessage.id)
      )
      console.error('Error sending message:', error)
    }
  }

  /**
   * Gets the display name for a user ID based on course data
   *
   * @param {string} senderId - The user ID of the message sender
   * @returns {string} The display name or user ID if not found
   */
  const getSenderName = senderId => {
    if (!courseData) return senderId

    if (senderId === user.uid) {
      return 'You'
    } else if (senderId === courseData.tuteeId) {
      return courseData.tuteeDisplayName || 'Student'
    } else if (senderId === courseData.tutorId) {
      return courseData.tutorDisplayName || 'Tutor'
    } else if (senderId === 'system') {
      return 'System'
    }
    return senderId
  }

  /**
   * Formats and returns the timestamp for a message
   *
   * @param {Object} message - The message object
   * @returns {string} Formatted time string
   */
  const getMessageTime = message => {
    // Use server timestamp if available, otherwise use optimistic timestamp
    const timestamp = message.createdAt
      ? message.createdAt.toDate()
      : message.optimisticCreatedAt

    return timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Renders the appropriate content for the chat container based on loading state
   *
   * @returns {JSX.Element} The content to display in the chat container
   */
  const renderChatContent = () => {
    if (isLoading) {
      return (
        <div className='flex items-center justify-center h-full'>
          <div className='text-center'>
            <LoadingDots className='mb-2' />
            <p className='text-gray-500'>Loading messages...</p>
          </div>
        </div>
      )
    }

    if (messagesWithOptimisticTimestamps.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={MOVEMENT_TRANSITION}
          className='text-center text-gray-500 italic mt-4'
        >
          No messages yet. Start the conversation!
        </motion.div>
      )
    }

    return (
      <AnimatePresence>
        {messagesWithOptimisticTimestamps.map(message => {
          const own = message.senderId === user.uid
          return (
            <motion.div
              key={message.id}
              className={`flex flex-col max-w-[80%] ${
                own ? 'self-end' : 'self-start'
              }`}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.9,
                x: own ? 20 : -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                x: 0,
              }}
              transition={MOVEMENT_TRANSITION}
            >
              <div
                className={`text-xs font-medium ${
                  own ? 'text-right' : 'text-left'
                } text-gray-600`}
              >
                {getSenderName(message.senderId)}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  own
                    ? 'bg-chat-own-message text-white rounded-br-none'
                    : 'bg-chat-other-message text-gray-800 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  own ? 'text-right' : 'text-left'
                }`}
              >
                {getMessageTime(message)}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    )
  }

  return (
    <CustomCard
      scrolling
      header='Chat'
      className='min-w-xs max-w-sm'
      footer={
        <motion.form
          className='flex gap-2 items-center mt-3 pt-2 border-t border-gray-200'
          ref={formRef}
          onSubmit={e => handleSendMessage(e)}
          autoComplete='off'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={MOVEMENT_TRANSITION}
        >
          <CustomInput
            ref={messageRef}
            name='message'
            type='text'
            placeholder='Type your message...'
            autoComplete='off'
          />
          <CustomButton
            onClick={() => messageRef.current?.focus()}
            type='submit'
          >
            Send
          </CustomButton>
        </motion.form>
      }
    >
      {user && <div className='h-full flex flex-col'>
        <div
          ref={chatContainerRef}
          className='flex flex-1 flex-col overflow-y-auto scrollbar-hidden p-2 space-y-3'
        >
          {renderChatContent()}
        </div>
      </div>}
    </CustomCard>
  )
})

ChatComponent.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseData: PropTypes.shape({
    tuteeId: PropTypes.string,
    tuteeDisplayName: PropTypes.string,
    tutorId: PropTypes.string,
    tutorDisplayName: PropTypes.string,
  }).isRequired,
}

export default ChatComponent
