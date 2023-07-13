import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string | JSX.Element
  error?: boolean
  errorMessage?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, className = '', error, errorMessage, ...rest }, ref) => (
    <>
      <div className={cn('inline-flex gap-small', className)}>
        <input
          {...rest}
          ref={ref}
          id={name}
          name={name}
          type='checkbox'
          className={cn('custom-checkbox w-6 h-6 opacity-0 flex-shrink-0', {
            'custom-checkbox-error': error,
          })}
        />
        <label data-testid='checkbox-label' htmlFor={name} className='relative text-black source-text'>
          {label}
        </label>
      </div>
      {error && errorMessage && (
        <p data-testid='checkbox-error-message' className='source-text text-red select-none'>
          {errorMessage}
        </p>
      )}
    </>
  )
)
