import { FormField, TFunction } from '@/shared/@types'
import dayjs from 'dayjs'
import * as yup from 'yup'

function getValidator(field: FormField, t: TFunction) {
  if (field.type === 'date')
    return yup
      .date()
      .max(dayjs().utc(), t('common:validDateField'))
      .required(t('common:validRequiredField'))
      .nullable()
      .default(null)

  const isRequired = !field.notRequired || field.isRequired

  const defaultSchema = yup.string().nullable().default(null)

  const isRequiredSchema = isRequired && defaultSchema.required(t('common:validRequiredField'))

  const minSchema =
    field.min &&
    defaultSchema.min(
      field.min,
      `${t('common:formMinValidationErrStart')} ${field.min} ${t('common:formMinMaxValidationErrEnd')}`
    )
  const maxSchema =
    field.max &&
    defaultSchema.max(
      field.max,
      `${t('common:formMaxValidationErrStart')} ${field.max} ${t('common:formMinMaxValidationErrEnd')}`
    )
  const onlyRuSchema =
    field.isOnlyRu && defaultSchema.matches(/^[\u0400-\u04FF ]+$/, t('common:formOnlyRuValidationErr'))
  const onlyNumberString =
    field.type === 'number' && defaultSchema.matches(/^\d+$/, t('common:formOnlyNumberStringValidationErr'))
  const schemas = [defaultSchema, isRequiredSchema, minSchema, maxSchema, onlyRuSchema, onlyNumberString]
  return schemas.reduce(
    //@ts-expect-error
    (acc, schema) => acc.concat(schema || defaultSchema),
    defaultSchema
  )
}

export const getFormValidationSchema = (formFields: FormField[], t: TFunction) => {
  const schema = formFields.reduce((acc, newField) => {
    const validator = getValidator(newField, t)
    return { ...acc, [newField.label]: validator }
  }, {})
  return yup.object().shape(schema)
}
