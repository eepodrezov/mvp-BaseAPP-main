import RCUpload, { UploadProps as RCUploadProps } from 'rc-upload'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { UploadHookProps, useUpload } from '@/shared/hooks'
import { RcFile } from 'rc-upload/lib/interface'
import { AxiosResponse } from 'axios'
import { FCWithChildren, FileModel } from '@/shared/@types'
import UploadIcon from '@/shared/assets/icons/common/upload.svg'

export interface UploadProps extends Omit<RCUploadProps, 'customRequest'> {
  optimistic?: boolean
  rules?: RegisterOptions
  error?: boolean
  customRequest?: (file: RcFile) => Promise<AxiosResponse<FileModel>>
}

// Использовать только внутри компонента Form
export const Upload: FCWithChildren<UploadProps> = ({
  children,
  name = 'files',
  optimistic,
  rules,
  error,
  className = '',
  disabled,
  customRequest,
  ...rest
}) => {
  const { control } = useFormContext()
  const { upload } = useUpload({
    multiple: rest.multiple,
    optimistic,
    customRequest,
  } as UploadHookProps)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <RCUpload
          disabled={disabled}
          className={cn('inline-flex input-focus focus-visible:ring-primary', className, {
            'focus-visible:ring-red': error,
          })}
          customRequest={upload}
          onSuccess={res => {
            if (rest.multiple) {
              const currentValue = field.value || []
              const existItemIndex = currentValue.findIndex((file: RcFile) => file.uid === res.uid)
              if (~existItemIndex) {
                currentValue[existItemIndex] = res
                field.onChange(currentValue)
                return
              }
              currentValue.push(res)
              field.onChange(currentValue)
              return
            }
            field.onChange(res)
          }}
          {...rest}
        >
          <button
            className={`group flex items-center justify-center w-[22px] h-[22px] border-[1.5px]
             border-black bg-transparent rounded-full hover:enabled:bg-black active:enabled:bg-white disabled:border-border
             m-1 disabled:cursor-not-allowed transition-colors`}
            disabled={disabled}
          >
            <UploadIcon className='transition-colors stroke-black group-hover:group-enabled:stroke-white group-active:group-enabled:stroke-black group-disabled:stroke-border' />
          </button>
        </RCUpload>
      )}
    />
  )
}
