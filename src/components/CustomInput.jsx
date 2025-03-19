import PropTypes from 'prop-types'

/**
 * CustomInput component
 *
 * This component is a custom text input field that can be used in forms.
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
 * @param {number} [props.maxLength] - The maximum number of characters allowed in the input field
 * @param {number} [props.minLength] - The minimum number of characters required in the input field
 * @param {string} [props.pattern] - The regex pattern the input field value must match (e.g., "[A-Za-z0-9]+")
 * @param {'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel' | 'tel-country-code' | 'tel-national' | 'tel-area-code' | 'tel-local' | 'tel-extension' | 'impp' | 'url' | 'photo'} [props.autoComplete] - The autocomplete attribute for the input field
 * @param {boolean} [props.autoFocus] - Whether the input field should automatically gain focus
 */
const CustomInput = ({
  name,
  type,
  onChange = () => {},
  placeholder,
  // value = '',
  required,
  className,
  disabled = false,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
}) => {
  const handleChange = e => {
    onChange(e)
    console.log(e)
  }

  return (
    <div className={`${className} w-full flex flex-col gap-1`}>
      <label className='text-sm font-semibold' htmlFor={name}>
        {name}
        <input
          id={name}
          name={name}
          type={type}
          onChange={handleChange}
          className='flex bg-white border-2 border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 font-medium'
          placeholder={placeholder}
          // value={value}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
        />
      </label>
    </div>
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
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
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
}

export default CustomInput
