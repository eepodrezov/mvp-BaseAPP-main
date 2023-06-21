import { Dispatch, FC, SetStateAction } from 'react'
import { UIDemoArgs, DemoArg } from './types'
import { Select } from '../select'

const availableParamsOptions = [
    { label: 'Заголовок', value: 'label', id: 'label' }
] as { label: string; value: DemoArg; id: string }[]

export interface AvailableArgsProps {
    setExtraParams: Dispatch<SetStateAction<UIDemoArgs>>
}

export const AvailableArgs:FC<AvailableArgsProps> = ({ setExtraParams }) => {
  return (
    <Select 
        options={availableParamsOptions}
        name=''
        label='Доступные параметры'
        onChange={
            (value: DemoArg | null) => value && setExtraParams(prev => ([...prev, value]))
        }
        
    />
  )
}
