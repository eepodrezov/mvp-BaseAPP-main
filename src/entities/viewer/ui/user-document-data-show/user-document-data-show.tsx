import { useTranslate } from '@/shared/lib'
import { TrancateContainer } from '@/shared/ui'
import { FC } from 'react'
import { UserDocument } from '../../lib'
import dayjs from 'dayjs'

export interface UserDocumentDataShowProps {
  userDocument: UserDocument
}

const userDocumentsFields = [
  'lastName',
  'firstName',
  'middleName',
  'dateBirthday',
  'seriesAndNumber',
  'agency',
  'dateIssue',
  'divisionCode',
  'registerDate',
  'registerCountry',
  'region',
  'registerProvince',
  'registerCity',
  'registerPostalCode',
  'inn',
  'snils',
]

const dateFields = ['dateBirthday', 'dateIssue', 'registerDate']

export const UserDocumentDataShow: FC<UserDocumentDataShowProps> = ({ userDocument }) => {
  const { t } = useTranslate(['profile'])

  function formatUserDocumentsField(field: string): string | undefined {
    const fieldValue = userDocument[field as keyof UserDocument]
    if (dateFields.includes(field)) {
      return dayjs(fieldValue).format('DD.MM.YYYY')
    }
    if (fieldValue) return String(fieldValue)
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-10  w-full max-w-[900px] desktop:grid  desktop:grid-cols-4'>
        {userDocumentsFields.map(
          (field: string) =>
            userDocument[field as keyof UserDocument] && (
              <div className='source-secondary-title text-black' key={field}>
                <p className='font-normal'>{t(field)}</p>
                <TrancateContainer maxWidth={500}>
                  <p className='font-bold whitespace-normal'>{formatUserDocumentsField(field)}</p>
                </TrancateContainer>
              </div>
            )
        )}
      </div>
    </div>
  )
}
