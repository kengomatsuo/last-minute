import { useContext } from 'react'
import { ScreenContext } from '../contexts/ScreenContext'
import { useConsoleLog } from '../hooks'

const AlertDialog = () => {
  const { alertQueue, popAlertHead } = useContext(ScreenContext)

  useConsoleLog('AlertDialog', alertQueue)

  if (!alertQueue.length) {
    return null
  }
  const { type, title, message } = alertQueue[0]

  const handleClose = () => {
    popAlertHead()
  }
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50'>
      <div
        className='absolute top-0 left-0 inset-0 bg-background-secondary/30'
        onClick={handleClose}
      />
      <div className='bg-white backdrop-blur-sm'>
        <div onClick={handleClose} />
        {title && title}
        <div>{message && message}</div>
      </div>
    </div>
  )
}

export default AlertDialog
