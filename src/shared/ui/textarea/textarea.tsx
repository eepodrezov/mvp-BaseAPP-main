import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react'
import cn from 'classnames'
import { Nullable, PropsWithClassName } from '@/shared/@types'

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  error?: boolean
  errorMessage?: string
  textareaStyle?: string
  resizable?: boolean
  autosize?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, PropsWithClassName<TextareaProps>>(
  (
    {
      name,
      label,
      className = '',
      children,
      textareaStyle = '',
      resizable,
      autosize = true,
      error,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<Nullable<HTMLTextAreaElement>>(null)
    const [isFocused, setIsFocused] = useState(false)
    const isVisiblePlaceholder = !isFocused && !innerRef.current?.value && !rest.value

    useEffect(() => {
      const textarea = innerRef.current
      const onChange = (e: Event | HTMLTextAreaElement) => {
        const element = ((e as Event).target as HTMLTextAreaElement) || e
        element.style.cssText = 'height:auto'
        element.style.cssText = 'height:' + element.scrollHeight + 'px'
      }
      const resizeObserver = new ResizeObserver(entries => onChange(entries[0].target as HTMLTextAreaElement))
      if (textarea && autosize) {
        textarea.addEventListener('input', onChange)
        resizeObserver.observe(textarea)
      }
      return () => {
        if (textarea) {
          textarea.removeEventListener('input', onChange)
          resizeObserver.unobserve(textarea)
        }
      }
    }, [autosize])

    const normalizeChildren = (childs?: ReactNode | ReactNode[]): ReactNode | ReactNode[] | undefined => {
      return Children.map(childs, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            disabled: rest.disabled,
          })
        }
        return child
      })
    }

    return (
      <div className={cn('group flex flex-col w-full gap-small', className)}>
        <label
          data-testid='textarea-label'
          htmlFor={name}
          className={cn('group-hover:text-primary text-black source-text', {
            invisible: isVisiblePlaceholder,
            '!text-red group-hover:text-red': error,
            'group-hover:text-gray': rest.disabled,
          })}
        >
          {label}
        </label>
        <div
          data-testid='textarea-container'
          className={cn(
            'flex flex-col rounded-base border-border px-5 pt-[13px] pb-5 border bg-white group-hover:border-black source-text',
            {
              '!border-black': isFocused,
              '!bg-gray !border-border cursor-not-allowed': rest.disabled,
              '!border-red': error,
            }
          )}
        >
          <textarea
            {...rest}
            data-testid='textarea'
            ref={instance => {
              innerRef.current = instance
              typeof ref === 'function' && ref(instance)
            }}
            placeholder={isVisiblePlaceholder ? label : ''}
            id={name}
            name={name}
            className={cn(
              `focus:outline-none source-secondary-title min-h-[6rem] overflow-hidden placeholder:source-text w-full disabled:text-border disabled:cursor-not-allowed
               hover:text-black placeholder:text-black !text-black focus:text-black border border-transparent disabled:bg-transparent disabled:placeholder:text-border`,
              {
                'group-hover:text-black focus:text-red': error,
                [textareaStyle]: textareaStyle,
                'resize-none': !resizable,
              }
            )}
            onFocus={e => {
              setIsFocused(true)
              rest.onFocus?.(e)
            }}
            onBlur={e => {
              setIsFocused(false)
              rest?.onBlur?.(e)
            }}
          />
          {children && normalizeChildren(children)}
        </div>
        {error && errorMessage && !rest.disabled && <p className='text-red mt-[3px] source-text'>{errorMessage}</p>}
      </div>
    )
  }
)
