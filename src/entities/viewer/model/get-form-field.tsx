import { FormField, TFunction } from '@/shared/@types'
import { Input, Datepicker } from '@/shared/ui'
import { Controller } from 'react-hook-form'
export function getFormField(field: FormField, t: TFunction, control: any) {
  const isRequired = !field.notRequired || field.isRequired
  if (field.postAsNumber) {
    return (
      <Controller
        name={field.label}
        control={control}
        render={({ field: formField, fieldState: { error } }) => (
          <Input
            {...formField}
            type='number'
            error={!!error}
            errorMessage={error?.message}
            label={t(field.label)}
            withoutSpace={false}
            placeholder={t(field.label)}
            //чтобы он не писал буквы, но сразу писал ошибку, что требуются только цифры
            value={formField.value ? String(formField.value) : ''}
            isRequired={isRequired}
            canStartWithNull={field.canStartWithNull}
          />
        )}
      />
    )
  }
  switch (field.type) {
    case 'text':
      return (
        <Controller
          name={field.label}
          control={control}
          render={({ field: formField, fieldState: { error } }) => (
            <Input
              {...formField}
              type='text'
              error={!!error}
              errorMessage={error?.message}
              label={t(field.label)}
              withoutSpace={false}
              placeholder={t(field.label)}
              //чтобы он не писал буквы, но сразу писал ошибку, что требуются только цифры
              isRequired={isRequired}
            />
          )}
        />
      )
    case 'number':
      return (
        <Controller
          name={field.label}
          control={control}
          render={({ field: formField, fieldState: { error } }) => (
            <Input
              {...formField}
              error={!!error}
              errorMessage={error?.message}
              type='number'
              name={field.label}
              label={t(field.label)}
              placeholder={t(field.label)}
              isRequired={isRequired}
              canStartWithNull={field.canStartWithNull}
            />
          )}
        />
      )
    case 'date':
      return (
        <Controller
          name={field.label}
          control={control}
          render={({ field: formField, formState: { errors } }) => (
            <Datepicker
              {...formField}
              defaultPickerValue={field.defaultPickerValue}
              isRequired={isRequired}
              inputProps={{
                label: t(field.label),
                error: !!errors[field.label],
                //@ts-expect-error
                errorMessage: errors[field.label]?.message,
              }}
            />
          )}
        />
      )
  }
}
