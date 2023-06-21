import { Input } from '../input'
import { Dispatch, SetStateAction } from 'react'
import { UIComponentsParams } from './types'
import { ChangeEvent } from 'react'

export const getDemoField = (field: string, setParams: Dispatch<SetStateAction<UIComponentsParams>>) => {
    switch (field) {
        case 'label':
            return (
                <Input 
                    label='Заголовок' 
                    placeholder="Заголовок"
                    key={'available' + field}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setParams((prev:UIComponentsParams) => ({...prev, label: e.target.value}))}
                />
            )
        default:
            break
    }
}
