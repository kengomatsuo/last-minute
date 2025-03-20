import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook to debounce a callback function.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} delay - The delay in milliseconds before executing the function.
 * @param {Array} [dependencies] - Optional dependencies that will trigger the callback immediately.
 * @returns {Function} - A debounced version of the callback function.
 *
 * @example
 * const debouncedSearch = useDebounce((query) => fetchResults(query), 500, [searchQuery]);
 */
const useDebounce = (callback, delay, dependencies = null) => {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(callback)

  // Update the latest callback function to prevent stale closures
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Debounced function
  const debouncedFunction = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay] // Only change when `delay` updates
  )

  // If dependencies are provided, execute callback when they change
  useEffect(() => {
    if (dependencies !== null) {
      callbackRef.current()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies ?? [])

  return debouncedFunction
}

export default useDebounce
