import { useState, cloneElement, Dispatch, FC } from 'react'
import { FCWithChildren } from '@/shared/@types'
import { getDemoField } from './get-demo-field'
import { UIDemoArgs, UIComponentsParams } from './types'
import { AvailableArgs } from './available-args'
import _ from 'lodash'

export interface UIDemoLayoutProps {
  args?: UIDemoArgs
}

export const UIDemoLayout:FCWithChildren<UIDemoLayoutProps> = ({
  args,
  children
}) => {
  const [params, setParams] = useState<UIComponentsParams>({})
  const [extraArgs, setExtraArgs] = useState<UIDemoArgs>([])
  console.log('first', extraArgs)
  return (
    <div 
      className='flex flex-col justify-between min-h-[50%]'
    >
      <div>
        <AvailableArgs setExtraParams={setExtraArgs}/>
        <div>
          {args && _.uniq(args).map((field) => getDemoField(field, setParams))}
          {args && _.uniq(extraArgs).map((field) => getDemoField(field, setParams))}
        </div>

      </div>
      {children && cloneElement((children as JSX.Element), {
          ...(children as JSX.Element).props,
          ...params
        })}
    </div>
  )
}
