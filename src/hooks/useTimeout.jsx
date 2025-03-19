import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook to manage a timeout.
 *
 * @param {Function} callback - The callback function to be executed after the delay.
 * @param {number} delay - The delay in milliseconds before the callback is executed.
 * @returns {Object} - An object containing the reset and clear functions.
 * @returns {Function} reset - Function to reset the timeout.
 * @returns {Function} clear - Function to clear the timeout.
 * 
 * @example
 * const { reset, clear } = useTimeout(() => {
 *   console.log('Timeout executed')
 * }, 1000)
 */
const useTimeout = (callback, delay) => {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

export default useTimeout