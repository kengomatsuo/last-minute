import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook to manage a stopwatch.
 *
 * @param {boolean} autoStart - Whether the stopwatch should start automatically.
 * @param {number | Date | { seconds: number, nanoseconds: number }} initialTime - The initial time of the stopwatch. Can be a number (seconds), a Date object, or a Firebase timestamp.
 * @returns {Object} - An object containing the current time in seconds, running state, and control functions.
 * @returns {number} time - The current time of the stopwatch in seconds.
 * @returns {boolean} isRunning - The running state of the stopwatch.
 * @returns {Function} start - Function to start the stopwatch.
 * @returns {Function} stop - Function to stop the stopwatch.
 * @returns {Function} reset - Function to reset the stopwatch.
 * 
 * @example
 * const { time, isRunning, start, stop, reset } = useStopWatch(false, new Date())
 */
const useStopWatch = (autoStart = false, initialTime = 0) => {
  const parseInitialTime = (time) => {
    if (time instanceof Date) {
      return Math.floor(time.getTime() / 1000)
    } else if (typeof time === 'object' && time.seconds !== undefined && time.nanoseconds !== undefined) {
      return time.seconds
    } else if (typeof time === 'number') {
      return time
    } else {
      return 0
    }
  }

  const [time, setTime] = useState(parseInitialTime(initialTime))
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time * 1000
      intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, time])

  const start = () => setIsRunning(true)
  const stop = () => setIsRunning(false)
  const reset = () => {
    setTime(parseInitialTime(initialTime))
    setIsRunning(false)
  }

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
  }
}

export default useStopWatch
