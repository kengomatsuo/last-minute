import PropTypes from 'prop-types'
import { useDebounce, useLocalStorage } from '../hooks'
import { useState, useEffect, useRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'

/**
 * CustomInput component
 *
 * Enhanced with auto-save functionality to persist input values to localStorage.
 * Uses debouncing to prevent excessive saves during typing.
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - The label for the input field
 * @param {React.ReactNode} [props.image] - An image to display next to the input
 * @param {string} props.name - The name of the input field
 * @param {'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' |
 * 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color' | 'suggest' | 'display'}
 * props.type - The type of the input field
 * @param {function} props.onChange - The function to call when the input value
 * changes
 * @param {string} [props.placeholder] - The placeholder text for the input field
 * @param {string} [props.value] - The current value of the input field
 * @param {boolean} [props.required] - Whether the input field is required
 * @param {string} [props.className] - Additional CSS classes for the input field
 * @param {string} [props.inputClassName] - Additional CSS classes for the input
 * @param {boolean} [props.disabled] - Whether the input field is disabled
 * @param {boolean} [props.autoFocus] - Whether the input field should be focused
 * on mount
 * @param {string} [props.autoComplete] - The autocomplete behavior for the
 * input field
 * @param {function} [props.validateFunction] - A custom validation function
 * for the input value
 * @param {string} [props.errorMessage] - The error message to display when
 * validation fails
 * @param {React.RefObject} [props.ref] - A ref object to expose the input field
 * @param {boolean | string} [props.autoSave] - The key to use for saving to
 * localStorage (defaults to `form_${props.name}`) or false to disable auto-save
 * @param {number} [props.saveDelay] - The delay in ms before saving to
 * localStorage (defaults to 1000ms)
 * @param {boolean | number} [props.multiline] - Whether the input field is a
 * textarea, and the number of rows if it is
 * @param {Array<string | {label: string, value: string}>} [props.options] -
 * Options to display when type is 'suggest'
 * @param {function} [props.onOptionSelect] - Function called when an option
 * is selected
 * @param {boolean} [props.forceSuggestions] - When true, requires selection from
 * available options for suggest inputs
 * @param {Array<string>} [props.requirements] - Additional requirements for the
 * input field
 * @param {boolean} [props.selectOnFocus] - Whether to select the input value
 * when the input field is focused
 */
const CustomInput = ({
  label = '',
  image = null,
  onChange = () => {},
  className = '',
  inputClassName = '',
  validateFunction,
  multiline = false,
  options = [],
  onOptionSelect = () => {},
  type,
  value, // remove = '' here
  forceSuggestions = false,
  requirements = [],
  autoSave = false,
  saveDelay = 500,
  ref,
  selectOnFocus = false,
  ...props
}) => {
  // Create a storage key based on input name if not provided
  const actualStorageKey = autoSave || `form_${props.name}`

  // Initialize local storage hook, but only if autoSave is enabled
  const [savedValue, setSavedValue] = useLocalStorage(
    autoSave ? actualStorageKey : null,
    value
  )

  const [errorMessage, setErrorMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [filteredOptions, setFilteredOptions] = useState(options)

  // Initialize input value from localStorage if autoSave is enabled,
  // otherwise use prop value if provided, else default to ''
  const [inputValue, setInputValue] = useState(
    autoSave && savedValue
      ? savedValue
      : value !== undefined
      ? value
      : ''
  )

  const [selectedFromOptions, setSelectedFromOptions] = useState(false)
  const dropdownRef = useRef(null)
  const inputContainerRef = useRef(null)
  // Add refs to track highlighted option elements
  const highlightedOptionRef = useRef(null)
  const inputElementRef = useRef(null)

  // Create a debounced save function
  const debouncedSave = useDebounce(valueToSave => {
    if (autoSave) {
      setSavedValue(valueToSave)
      console.log(`Auto-saved value for ${props.name}: ${valueToSave}`)
    }
  }, saveDelay)

  // Scroll highlighted option into view when navigating with keyboard
  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      dropdownRef.current &&
      type === 'suggest' &&
      isFocused
    ) {
      try {
        const optionElements = dropdownRef.current.querySelectorAll('div')
        if (optionElements && optionElements.length > highlightedIndex) {
          const highlightedOption = optionElements[highlightedIndex]

          if (highlightedOption) {
            // Calculate if element is outside of visible area
            const containerRect = dropdownRef.current.getBoundingClientRect()
            const optionRect = highlightedOption.getBoundingClientRect()

            // Check if the highlighted option is outside the visible area
            if (
              optionRect.bottom > containerRect.bottom ||
              optionRect.top < containerRect.top
            ) {
              // Scroll the option into view with a smooth behavior
              highlightedOption.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              })
            }
          }
        }
      } catch (error) {
        console.error('Error scrolling dropdown option into view:', error)
      }
    }
  }, [highlightedIndex, isFocused, type])

  useImperativeHandle(ref, () => {
    return {
      validate: () => handleValidate(inputValue),
      getSavedValue: () => savedValue,
      saveValue: val => autoSave && setSavedValue(val || inputValue),
      reset: () => {
        setInputValue('')
        setSavedValue('')
      },
      focus: () => {
        // Find the input/textarea element and focus it
        const inputElement = inputContainerRef.current?.querySelector('input, textarea')
        if (inputElement) {
          inputElement.focus()
        }
      }
    }
  })

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isFocused &&
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFocused])

  // Update filtered options when options or input value changes
  useEffect(() => {
    if (type === 'suggest' && isFocused && inputValue === '') {
      setFilteredOptions(options)
      setHighlightedIndex(options.length > 0 ? 0 : -1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  // Update input value when external value prop changes
  useEffect(() => {
    // Only update if value is defined (controlled)
    if (value !== undefined) {
      // For suggest type, always show label if possible
      if (type === 'suggest') {
        let label = value
        const match = options.find(option =>
          typeof option === 'string'
            ? option === value
            : option.value === value
        )
        if (match) {
          label = typeof match === 'string' ? match : match.label
        }
        setInputValue(label)
      } else {
        setInputValue(value)
      }
      // Reset selected from options when value is changed externally
      if (value === '') {
        setSelectedFromOptions(false)
      }
    }
  }, [value, autoSave, type, options])

  // Save the current value when the component unmounts
  useEffect(() => {
    return () => {
      // Final save on unmount
      if (autoSave && inputValue) {
        setSavedValue(inputValue)
        console.log(`Saved ${props.name} value on unmount: ${inputValue}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Filters the options based on input text
   *
   * @param {string} text - Text to filter options by
   * @returns {void}
   */
  const filterOptions = text => {
    if (!text.length) {
      setFilteredOptions(options)
      return
    }

    const lowercaseText = text.toLowerCase()
    const filtered = options.filter(option => {
      if (typeof option === 'string') {
        return option.toLowerCase().includes(lowercaseText)
      } else {
        return option.label.toLowerCase().includes(lowercaseText)
      }
    })

    setFilteredOptions(filtered)

    // Reset highlighted index when options change
    setHighlightedIndex(filtered.length > 0 ? 0 : -1)
  }

  /**
   * Validates the input value against requirements and custom validation
   *
   * @param {string} value - The value to validate
   * @returns {Promise<boolean>} - Promise that resolves when validation is
   * complete
   */
  const handleValidate = async value => {
    // First check if field is required but empty
    if (props.required && (!value || value.trim() === '')) {
      setErrorMessage('This field is required')
      validateFunction && validateFunction('')
      return false
    }

    // Check if we need to force selection from suggestions
    if (
      type === 'suggest' &&
      forceSuggestions &&
      value &&
      !selectedFromOptions
    ) {
      // Check if the current value exactly matches any option
      const exactMatch = options.some(option => {
        const optionText = typeof option === 'string' ? option : option.label
        return optionText.toLowerCase() === value.toLowerCase()
      })

      if (!exactMatch) {
        setErrorMessage('Please select a value from the options available')
        return false
      }
    }

    // If there's a custom validation function, run it
    if (validateFunction) {
      try {
        await validateFunction(value)
        setErrorMessage('')
        return true
      } catch (error) {
        setErrorMessage(error.message)
        return false
      }
    } else {
      // Clear any previous error message
      setErrorMessage('')
      return true
    }
  }

  const debouncedValidateFunction = useDebounce(handleValidate, 500)

  /**
   * Handles input change events
   *
   * @param {React.ChangeEvent} e - The change event
   * @returns {void}
   */
  const handleChange = e => {
    setErrorMessage('')
    const newValue = e.target.value
    setInputValue(newValue)

    // When typing, the user is no longer selecting from options
    if (type === 'suggest') {
      setSelectedFromOptions(false)
      filterOptions(newValue)
    }

    // Always run validation to check required fields
    debouncedValidateFunction(newValue)

    // Save to localStorage with debounce to prevent too many saves
    debouncedSave(newValue)

    onChange(e)
  }

  /**
   * Handles input focus events
   *
   * @returns {void}
   */
  const handleFocus = () => {
    setIsFocused(true)
    if (type === 'suggest') {
      setFilteredOptions(options)
      setHighlightedIndex(options.length > 0 ? 0 : -1)
    }
    if (selectOnFocus && inputElementRef.current) {
      inputElementRef.current.select()
    }
  }

  /**
   * Handles the blur event for the input.
   * For suggest-type inputs, we need to check if this is a tab navigation.
   *
   * @param {React.FocusEvent} e - The blur event
   * @returns {void}
   */
  const handleBlur = e => {
    handleValidate(inputValue)

    // Immediately save value on blur (without debounce)
    if (autoSave) {
      setSavedValue(inputValue)
    }

    if (type !== 'suggest') {
      setIsFocused(false)
      return
    }

    // If this is a tab key navigation, close the dropdown
    // relatedTarget will be null or another element
    if (
      e.relatedTarget === null ||
      (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget))
    ) {
      // Small delay to allow for option clicks to complete
      requestAnimationFrame(() => {
        setIsFocused(false)
      })
    }
  }

  /**
   * Handles the selection of an option from the dropdown
   *
   * @param {string | Object} option - The selected option
   * @returns {void}
   */
  const handleOptionClick = option => {
    const value = typeof option === 'string' ? option : option.value
    const label = typeof option === 'string' ? option : option.label

    setInputValue(label) // always set label in input
    setSelectedFromOptions(true)

    // Create a synthetic event to mimic the onChange event
    const syntheticEvent = {
      target: {
        name: props.name,
        value, // value is passed to onChange
      },
    }

    onChange(syntheticEvent)
    onOptionSelect(value, label)
    setIsFocused(false)

    // Clear any error messages when a valid option is selected
    setErrorMessage('')

    // Save to localStorage immediately when option is selected
    if (autoSave) {
      setSavedValue(label)
    }
  }

  /**
   * Handles keyboard navigation of the dropdown
   *
   * @param {React.KeyboardEvent} e - The keyboard event
   * @returns {void}
   */
  const handleKeyDown = e => {
    if (!isFocused || type !== 'suggest' || !filteredOptions.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      )
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      handleOptionClick(filteredOptions[highlightedIndex])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsFocused(false)
    } else if (e.key === 'Tab') {
      // Close the dropdown when tabbing away, but don't prevent default
      // to allow natural tab navigation
      setIsFocused(false)
    }
  }

  // Common styling for both input and textarea
  const commonClassName = `${
    errorMessage && !isFocused
      ? '!border-error !fill-error'
      : isFocused
      ? 'fill-primary'
      : 'fill-input-icon'
  } 
    ${inputClassName ? inputClassName : 'p-2'} mt-0.5 flex flex-1 bg-input-background border-2 border-primary/50 transition-all rounded focus:outline-none focus:ring-2 focus:ring-primary font-medium`

  // console.log("type:", type)

  // console.log("savedValue:", savedValue)
  if (type === 'display')
    return (
      <input
        className={`${className} pointer-events-none`}
        type='text'
        name={props.name}
        value={savedValue}
      />
    )
  return (
    <motion.label
      className={`${className} w-full flex flex-col text-sm font-semibold relative`}
      htmlFor={props.name}
      layout
      ref={inputContainerRef}
    >
      {label}
      {props.required && label && '*'}
      <div
        className={`${
          image
            ? commonClassName +
              ' !pl-1 ' +
              (isFocused && inputClassName ? '!border-b-3' : '')
            : ''
        } w-full items-center flex flex-row`}
      >
        {image}
        {multiline ? (
          <textarea
            {...props}
            value={inputValue}
            name={props.name}
            disabled={props.disabled}
            rows={multiline === true ? 3 : multiline}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${
              !image ? commonClassName : 'flex-1 p-2'
            } resize-none min-h-[70px]`}
            ref={inputElementRef}
          />
        ) : (
          <input
            name={props.name}
            value={inputValue}
            type={type === 'suggest' ? 'text' : type}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={props.disabled}
            placeholder={props.placeholder}
            className={!image ? commonClassName : 'flex-1  p-2'}
            min={props.min}
            max={props.max}
            autoComplete={type === 'suggest' ? 'off' : props.autoComplete}
            ref={inputElementRef}
            autoFocus={props.autoFocus}
          />
        )}
      </div>

      {type === 'suggest' ? (
        <AnimatePresence>
          {isFocused && filteredOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.1 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
              transition={MOVEMENT_TRANSITION}
              className='absolute left-0 right-0 top-full mt-1 max-h-60 overflow-y-auto rounded-md border border-primary/30 bg-input-background shadow-lg z-10'
              ref={dropdownRef}
            >
              {filteredOptions.map((option, index) => {
                const label = typeof option === 'string' ? option : option.label
                return (
                  <div
                    key={index}
                    className={`px-3 py-2 cursor-pointer hover:bg-primary/10 ${
                      index === highlightedIndex ? 'bg-primary/20' : ''
                    }`}
                    onPointerDown={() => handleOptionClick(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    ref={
                      index === highlightedIndex ? highlightedOptionRef : null
                    }
                  >
                    {label}
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      ) : null}

      <AnimatePresence>
        {requirements.length !== 0 && type !== 'suggest' && (
          <motion.ul
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{
              height: 32 * requirements.length,
              opacity: 1,
              marginTop: 4,
            }}
            exit={{
              height: 0,
              opacity: 0,
              marginTop: -10, // How does this work???
            }}
            transition={MOVEMENT_TRANSITION}
            style={{ listStyle: 'none', paddingTop: 10, maxWidth: 400 }}
          >
            {requirements.map((item, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 4,
                  color: errorMessage && !isFocused ? 'var(--color-error)' : item.complete ? '#22c55e' : '#99a1af',
                }}
                className='font-normal transition-all'
              >
                <span
                  style={{
                    width: 20,
                    marginRight: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}
                >
                  {item.complete ? '✔' : '●'}
                </span>
                {item.text}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!requirements.length &&
          errorMessage &&
          (!filteredOptions.length || !isFocused) && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 4, opacity: 1, marginTop: 4 }}
              exit={{
                height: 0,
                opacity: 0,
                marginTop: 0,
                transition: { duration: 0.15 },
              }}
              transition={MOVEMENT_TRANSITION}
            >
              <motion.p className='text-error'>{errorMessage}</motion.p>
            </motion.div>
          )}
      </AnimatePresence>
    </motion.label>
  )
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'datetime-local',
    'month',
    'week',
    'time',
    'color',
    'suggest',
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  autoSave: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  saveDelay: PropTypes.number,
  enterKeyHint: PropTypes.oneOf(['none', 'go', 'next', 'search', 'send']),
  autoComplete: PropTypes.oneOf([
    'on',
    'off',
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',
    'impp',
    'url',
    'photo',
  ]),
  min: PropTypes.string,
  max: PropTypes.string,
  autoFocus: PropTypes.bool,
  validateFunction: PropTypes.func,
  errorMessage: PropTypes.string,
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ])
  ),
  onOptionSelect: PropTypes.func,
  forceSuggestions: PropTypes.bool,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  label: PropTypes.string,
  image: PropTypes.node,
  inputClassName: PropTypes.string,
  requirements: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ),
  selectOnFocus: PropTypes.bool,
}

export default CustomInput
