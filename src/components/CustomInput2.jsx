import PropTypes from 'prop-types'
import { useDebounce } from '../hooks'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'

import Eye from '../assets/icons/openEye.svg?react'
import EyeOff from '../assets/icons/closeEye.svg?react'
import { isEmpty } from 'lodash'

/**
 * CustomInput2 component
 *
 * This component is a custom text input field that can be used in forms.
 * Uses Framer Motion for smooth animations when error messages appear/disappear.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the input field
 * @param {'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color'} props.type - The type of the input field
 * @param {function} props.onChange - The function to call when the input value changes
 * @param {string} [props.placeholder] - The placeholder text for the input field
 * @param {string} [props.value] - The current value of the input field
 * @param {boolean} [props.required] - Whether the input field is required
 * @param {string} [props.className] - Additional CSS classes for the input field
 * @param {boolean} [props.disabled] - Whether the input field is disabled
 * @param {'none' | 'go' | 'next' | 'search' | 'send'} [props.enterKeyHint] - The enter key hint for the input field
 * @param {number} [props.maxLength] - The maximum number of characters allowed in the input field
 * @param {number} [props.minLength] - The minimum number of characters required in the input field
 * @param {string} [props.pattern] - The regex pattern the input field value must match (e.g., "[A-Za-z0-9]+")
 * @param {'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extension' | 'impp' | 'url' | 'photo'} [props.autoComplete] - The autocomplete attribute for the input field
 * @param {boolean} [props.autoFocus] - Whether the input field should automatically gain focus
 * @param {function} [props.validateFunction] - A function to validate the input field value
 * @param {string} [props.errorMessage] - The error message to display if validation fails
 * @param {boolean} [props.multiline] - Whether the input field should be a textarea
 * @param {number} [props.rows] - The number of rows for the textarea
 */
const CustomInput2 = ({
  onChange = () => {},
  className,
  image = null,
  validateFunction,
  multiline = false,
  rows = 3,
  requirements = [],
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [focus, setFocus] = useState(false)
  const [see, setSee] = useState(false)

  useEffect(() => {
    setErrorMessage(props?.errorMessage || '')
  }, [props])

  const handleValidate = async value => {
    try {
      await validateFunction(value)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const debouncedValidateFunction = useDebounce(handleValidate, 500)

  const handleChange = e => {
    if (validateFunction) {
      debouncedValidateFunction(e.target.value)
    }
    onChange(e)
  }

  // Common styling for both input and textarea
  const commonClassName = 'mt-0.5 flex bg-white w-full border-b-2 border-primary/50 transition-all p-2 !rounded-none !focus:shadow-none focus:rounded-none focus:ring-0 focus:outline-none font-medium'

  return (
    <motion.label
      className={`${className} w-full flex flex-col text-sm font-semibold`}
      htmlFor={props.name}
      layout
    >
      {props.name}{props.required && '*'}
      
      {multiline ? (
        <div className={`${focus ? 'border-b-2 border-primary' : ''}`}>
            {image}
            <textarea
                {...props}
                rows={rows}
                onChange={handleChange}
                className={`${commonClassName} resize-none min-h-[70px]`}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
      ) : (
        <div className={`flex items-center ${focus ? 'border-b-2 border-primary' : ''}`}>
            <div className='border-b-2 border-primary/50 flex items-center justify-center h-10'>
                {image}
            </div>
            <input
                {...props}
                type={see ? 'text' : props?.type}
                onChange={handleChange}
                className={commonClassName}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {props?.type === 'password' && (
                <button
                    type='button'
                    className='focus:outline-none border-b-2 border-primary/50 flex items-center justify-center h-10'
                    onClick={() => setSee(!see)}
                >
                    {see ? <Eye /> : <EyeOff />}
                </button>
            )}
        </div>
      )}

      {!isEmpty(requirements) && (
        <ul style={{ listStyle: 'none', paddingTop: 10, maxWidth: 400 }}>
          {requirements.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 10,
                color: item.complete ? '#22c55e' : '#99a1af'
              }}
              className='font-normal'
            >
              <span style={{
                width: 20,
                marginRight: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}>
                {item.complete ? '✔' : '●'}
              </span>
              {item.text}
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 4 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={MOVEMENT_TRANSITION}
          >
            <motion.p
              className='text-red-500'
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
            >
              {errorMessage}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* {console.log('errorMessage: ', errorMessage, '\nprops.errorMessage: ', props.errorMessage)} */}
    </motion.label>
  )
}

CustomInput2.propTypes = {
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
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  enterKeyHint: PropTypes.oneOf(['none', 'go', 'next', 'search', 'send']),
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
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
  autoFocus: PropTypes.bool,
  validateFunction: PropTypes.func,
  errorMessage: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
}

export default CustomInput2
