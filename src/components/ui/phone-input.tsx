import { forwardRef, useState, useCallback, useMemo } from 'react'
import { Input, InputProps } from 'antd'
import styled from 'styled-components'
import { cn } from '@/utils/helper'

interface PhoneInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  onValidationChange?: (isValid: boolean) => void
  className?: string
  error?: boolean
  errorMessage?: string
}

export const PhoneInput = forwardRef<any, PhoneInputProps>(
  (
    {
      value = '',
      onChange,
      onValidationChange,
      className,
      error = false,
      errorMessage,
      placeholder = '+998 (XX) XXX-XX-XX',
      ...props
    },
    ref
  ) => {
    const [_, setIsFocused] = useState(false)
    const [displayValue, setDisplayValue] = useState('')

    // Format phone number for display
    const formatPhoneNumber = useCallback((input: string): string => {
      // Remove all non-numeric characters
      const numbers = input.replace(/\D/g, '')

      // Limit to 9 digits (Uzbekistan mobile numbers)
      const limitedNumbers = numbers.slice(0, 9)

      if (limitedNumbers.length === 0) return ''

      // Format based on length
      if (limitedNumbers.length <= 2) {
        return `+998 (${limitedNumbers}`
      } else if (limitedNumbers.length <= 5) {
        return `+998 (${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
      } else if (limitedNumbers.length <= 7) {
        return `+998 (${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 5)}-${limitedNumbers.slice(5)}`
      } else {
        return `+998 (${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 5)}-${limitedNumbers.slice(5, 7)}-${limitedNumbers.slice(7)}`
      }
    }, [])

    // Extract numeric value from formatted string
    const extractNumbers = useCallback((formatted: string): string => {
      return formatted.replace(/\D/g, '')
    }, [])

    // Validate phone number
    const isValidPhoneNumber = useCallback((numbers: string): boolean => {
      return numbers.length === 9
    }, [])

    // Handle input change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value

        // If user is typing after +998, format the rest
        if (inputValue.startsWith('+998')) {
          const afterPrefix = inputValue.slice(4)
          const formatted = formatPhoneNumber(afterPrefix)
          const fullFormatted = formatted ? `+998 ${formatted.slice(5)}` : '+998 '

          setDisplayValue(fullFormatted)

          // Extract numbers for the actual value
          const numbers = extractNumbers(afterPrefix)
          const fullValue = numbers ? `998${numbers}` : ''

          onChange?.(fullValue)
          onValidationChange?.(isValidPhoneNumber(numbers))
        } else {
          // If user is typing from beginning, add +998 prefix
          const formatted = formatPhoneNumber(inputValue)
          const fullFormatted = formatted ? `+998 ${formatted.slice(5)}` : '+998 '

          setDisplayValue(fullFormatted)

          const numbers = extractNumbers(inputValue)
          const fullValue = numbers ? `998${numbers}` : ''

          onChange?.(fullValue)
          onValidationChange?.(isValidPhoneNumber(numbers))
        }
      },
      [formatPhoneNumber, extractNumbers, isValidPhoneNumber, onChange, onValidationChange]
    )

    // Handle keydown for backspace
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          const currentValue = displayValue
          const cursorPosition = e.currentTarget.selectionStart || 0

          // If cursor is at a formatting character, move it back
          if (currentValue[cursorPosition - 1] && !/\d/.test(currentValue[cursorPosition - 1])) {
            e.preventDefault()
            const newPosition = cursorPosition - 1
            setTimeout(() => {
              e.currentTarget.setSelectionRange(newPosition, newPosition)
            }, 0)
          }
        }
      },
      [displayValue]
    )

    // Handle paste
    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedText = e.clipboardData.getData('text')
        const numbers = pastedText.replace(/\D/g, '')

        if (numbers.length > 0) {
          const formatted = formatPhoneNumber(numbers)
          const fullFormatted = formatted ? `+998 ${formatted.slice(5)}` : '+998 '

          setDisplayValue(fullFormatted)

          const fullValue = numbers ? `998${numbers}` : ''
          onChange?.(fullValue)
          onValidationChange?.(isValidPhoneNumber(numbers))
        }
      },
      [formatPhoneNumber, onChange, onValidationChange, isValidPhoneNumber]
    )

    // Initialize display value from prop value
    useMemo(() => {
      if (value && value.startsWith('998')) {
        const numbers = value.slice(3)
        const formatted = formatPhoneNumber(numbers)
        const fullFormatted = formatted ? `+998 ${formatted.slice(5)}` : '+998 '
        setDisplayValue(fullFormatted)
      } else if (!value) {
        setDisplayValue('+998 ')
      }
    }, [value, formatPhoneNumber])

    // Determine validation state
    const numbers = extractNumbers(displayValue.slice(5))
    const isValid = numbers.length === 9 && isValidPhoneNumber(numbers)
    const showError = error || (displayValue.length > 5 && !isValid && displayValue !== '+998 ')

    return (
      <div className="relative">
        <CustomInput
          {...props}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="tel"
          onPaste={handlePaste}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          placeholder={placeholder}
          className={cn(
            'w-full',
            showError && 'border-red-500 focus:border-red-500',
            isValid && !showError && 'border-green-500 focus:border-green-500 focus:ring-green-500',
            className
          )}
          maxLength={20}
        />
        {showError && errorMessage && <div className="mt-1 text-sm text-red-500">{errorMessage}</div>}
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

const CustomInput = styled(Input)`
  background-color: #f7f7f7 !important;
  padding: 8px 16px !important;
  color: #0d0d0d !important;
  border: 1px solid #e5e5e5 !important;
  border-radius: 8px !important;
  transition: all 0.2s ease-in-out !important;

  &:hover {
    border-color: #004ed1 !important;
  }

  &:focus {
    border-color: #004ed1 !important;
    box-shadow: 0 0 0 2px rgba(0, 175, 255, 0.1) !important;
  }

  &.ant-input-status-error {
    border-color: #ff4d4f !important;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1) !important;
  }

  &.border-green-500 {
    border-color: #22c55e !important;
  }

  &.border-green-500:focus {
    border-color: #22c55e !important;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1) !important;
  }

  ::placeholder {
    color: #a3a3a3 !important;
    opacity: 1 !important;
  }

  .ant-input {
    &:disabled {
      color: #000 !important;
    }
  }
`

// Export validation function for external use
export const validateUzbekistanPhone = (phoneNumber: string): boolean => {
  const numbers = phoneNumber.replace(/\D/g, '')
  if (numbers.length !== 12 || !numbers.startsWith('998')) return false

  const mobileNumber = numbers.slice(3)
  const validPrefixes = ['90', '91', '93', '94', '95', '97', '99', '88', '89']
  const prefix = mobileNumber.slice(0, 2)

  return validPrefixes.includes(prefix)
}

// Export formatting function for external use
export const formatUzbekistanPhone = (phoneNumber: string): string => {
  const numbers = phoneNumber.replace(/\D/g, '')
  if (numbers.length !== 12 || !numbers.startsWith('998')) return phoneNumber

  const mobileNumber = numbers.slice(3)
  if (mobileNumber.length !== 9) return phoneNumber

  return `+998 (${mobileNumber.slice(0, 2)}) ${mobileNumber.slice(2, 5)}-${mobileNumber.slice(5, 7)}-${mobileNumber.slice(7)}`
}
