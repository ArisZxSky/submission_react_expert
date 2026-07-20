import { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '../icons/Icon'

function TextField ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
  minLength,
  helpText
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && isPasswordVisible ? 'text' : type

  return (
    <div className='form-field'>
      <label htmlFor={id}>{label}</label>
      <div className='form-field__control'>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
        />
        {isPassword && (
          <button
            type='button'
            className='form-field__toggle'
            onClick={() => setIsPasswordVisible((current) => !current)}
            aria-label={isPasswordVisible ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            <Icon name={isPasswordVisible ? 'eyeOff' : 'eye'} size={19} />
          </button>
        )}
      </div>
      {helpText && <small>{helpText}</small>}
    </div>
  )
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  helpText: PropTypes.string
}

export default TextField
