import { useContext } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import { useConsoleLog } from '../hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'

const AlertDialog = () => {
  const { alertQueue, popAlertHead } = useContext(ScreenContext)

  useConsoleLog('AlertDialog', alertQueue)

  const { type, title, message } = alertQueue[0] || {}

  const handleClose = () => {
    popAlertHead()
  }
  return (
    <AnimatePresence>
      {alertQueue.length > 0 ? (
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-30'>
          <motion.div
            className='absolute top-0 left-0 inset-0 bg-background-secondary/30 z-30'
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOVEMENT_TRANSITION}
          />
          <motion.div
            className='bg-white/75 backdrop-blur-[4px] flex flex-col text-center px-4 py-2 rounded-lg z-40 min-w-3xs min-h-32'
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={MOVEMENT_TRANSITION}
          >
            <div onClick={handleClose} />
            {title || 'Alert'}
            <div className='flex-1 flex items-center justify-center'>
              {!!message && message}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

export default AlertDialog
