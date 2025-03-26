import { useEffect, useState } from 'react'

const getSavedValue = (key, initialValue) => {
  // Check if the item exists in localStorage first
  const item = localStorage.getItem(key)
  
  // Only parse the item if it exists
  if (item !== null) {
    try {
      return JSON.parse(item)
    } catch (error) {
      console.error(`Error parsing localStorage item ${key}:`, error)
      // Fall through to return initialValue
    }
  }

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

/**
 * Custom hook to manage state with localStorage.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @param {any} initialValue - The initial value to use if there is no saved value.
 * @returns {[any, Function]} - An array containing the current value and a function to update it.
 * 
 * @example
 * const [name, setName] = useLocalStorage('name', 'John Doe')
 * 
 * @example
 * const [count, setCount] = useLocalStorage('count', 0)
 */
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
