import { FormStep } from '@/shared/@types'
import dayjs from 'dayjs'
export const passportFormStepsData: FormStep[] = [
  {
    stepTitle: 'Name and date of birth',
    stepTitleRu: 'Имя и дата рождения',
    stepFields: [
      {
        label: 'lastName',
        type: 'text',
      },
      {
        label: 'firstName',
        type: 'text',
      },
      {
        label: 'middleName',
        type: 'text',
      },
      {
        label: 'dateBirthday',
        type: 'date',
        defaultPickerValue: dayjs().utc().subtract(20, 'year'),
      },
    ],
  },
  {
    stepTitle: 'Passport details',
    stepTitleRu: 'Паспортные данные',
    stepFields: [
      {
        label: 'seriesAndNumber',
        type: 'number',
        min: 8,
        max: 15,
      },
      {
        label: 'agency',
        type: 'text',
        max: 150,
      },
      {
        label: 'registerDate',
        type: 'date',
        max: 250,
      },
      {
        label: 'divisionCode',
        type: 'number',
        postAsNumber: true,
        max: 10,
      },
    ],
  },
  {
    stepTitle: 'Registration',
    stepTitleRu: 'Регистрация',
    stepFields: [
      {
        label: 'registerCountry',
        type: 'text',
        max: 250,
      },
      {
        label: 'registerProvince',
        type: 'text',
        max: 250,
      },
      {
        label: 'region',
        type: 'text',
        notRequired: true,
        max: 250,
      },
      {
        label: 'registerCity',
        type: 'text',
        max: 250,
      },
      {
        label: 'registerAddress',
        type: 'text',
        max: 250,
      },
      {
        label: 'dateIssue',
        type: 'date',
        max: 250,
      },
      {
        label: 'registerPostalCode',
        type: 'number',
        max: 10,
      },
    ],
  },
  {
    stepTitle: 'INN and SNILS',
    stepTitleRu: 'ИНН и СНИЛС',
    isBottomWarning: true,
    stepFields: [
      {
        label: 'inn',
        type: 'number',
        max: 15,
      },
      {
        label: 'snils',
        type: 'text',
        notRequired: true,
        max: 250,
      },
    ],
  },
]
