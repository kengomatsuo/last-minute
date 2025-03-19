import { useEffect } from 'react'

/**
 * Custom hook to log a value to the console whenever it changes.
 *
 * @param {string} label - The label of the logged value.
 * @param {any} value - The value to log to the console.
 * 
 * @example
 * useConsoleLog('Name', name)
 * 
 * @example
 * useConsoleLog('Count', count)
 */
const useConsoleLog = (label, value) => {
  useEffect(() => {
    if (value === undefined) {
      console.log(`${label}: %c${value}`, 'color: navy; font-weight: bold;')
    } else if (value === null) {
      console.log(`${label}: %c${value}`, 'color: red; font-weight: bold;')
    } else {
      console.log(label, value)
    }
  }, [label, value])
}

export default useConsoleLog
