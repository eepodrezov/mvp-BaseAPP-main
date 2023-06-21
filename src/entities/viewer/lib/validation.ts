import { TFunction } from '@/shared/@types'
import * as yup from 'yup'

export const callbackSchema = (t: TFunction) =>
  yup.object({
    phone: yup.string().required(t('validRequiredField')).min(11, t('validPhone')),
    comment: yup.string().required(t('validRequiredField')),
  })
