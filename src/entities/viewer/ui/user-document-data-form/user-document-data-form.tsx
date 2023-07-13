import { useMemo, FC } from 'react'
import { useModalState } from '@/shared/hooks'
import { Form, notify, onSubmit, useTranslate } from '@/shared/lib'
import { Button, Informer } from '@/shared/ui'
import {
  userDocumentDataModalAtom,
  stepOrderAtom,
  getFormField,
  viewerAtom,
  useUserDocumentCollection,
  HasValuesChangedAtom,
} from '../../model'
import { useAtom, useAtomValue } from 'jotai'
import { UserDocument, Steps, getFormValidationSchema } from '../../lib'
import { postPassportData } from '../../model/user-document-viewer-request'
import { passportFormStepsData } from './user-document-form-steps-data'
import { serverSideValidationUserDocumentCreate } from './lib'
import { useUpdateAtom } from 'jotai/utils'

interface UserDocumentDataFormProps {
  handleClose: () => void
}

export const UserDocumentDataForm: FC<UserDocumentDataFormProps> = ({ handleClose }) => {
  const { t, i18n } = useTranslate(['profile', 'common'])
  const { onClose } = useModalState(userDocumentDataModalAtom)
  const { refetch } = useUserDocumentCollection()
  const [step, setStep] = useAtom(stepOrderAtom)
  const setHasValuesChanged = useUpdateAtom(HasValuesChangedAtom)
  const viewer = useAtomValue(viewerAtom)
  const defaultValues = {
    firstName: viewer?.firstName || '',
    lastName: viewer?.lastName || '',
    middleName: viewer?.middleName || '',
    dateBirthday: null,
    seriesAndNumber: null,
    dateIssue: null,
    agency: null,
    divisionCode: null,
    inn: null,
    registerCity: null,
    registerCountry: null,
    registerProvince: null,
    registerAddress: null,
    registerDate: null,
    registerPostalCode: null,
  }

  const stepTitle = useMemo(() => {
    //switch заложен на будущие 4 языка
    switch (i18n.language) {
      case 'ru':
        return passportFormStepsData[step - 1].stepTitleRu
      case 'en':
        return passportFormStepsData[step - 1].stepTitle
      default:
        return passportFormStepsData[step - 1].stepTitle
    }
  }, [i18n.language, step])

  return (
    <div className='flex flex-col desktop:w-[460px] w-full gap-[23px] select-none'>
      <div className='flex items-center justify-between'>
        <h1 className='croogla-secondary-text'>{t('Fill in the data')}</h1>
      </div>
      <Informer className='mx-auto'>
        {t('This data will be used for customs clearance of the car and filling in the electronic PTS')}
      </Informer>
      <Form<UserDocument>
        //@ts-expect-error
        validationSchema={getFormValidationSchema(passportFormStepsData[step - 1].stepFields, t)}
        trimOnSubmit
        formParams={{
          mode: 'onChange',
          defaultValues,
        }}
        onSubmit={data => {
          step === passportFormStepsData.length &&
            onSubmit(data)({
              submitRequest: postPassportData,
              onSuccess: () => {
                refetch()
                notify(t('Passport data have been sent successfully!'))
              },
              onError: err => {
                serverSideValidationUserDocumentCreate(t, err)
              },
            }).finally(() => {
              onClose()
              setStep(1)
            })
        }}
      >
        {({ isLoading, formState: { isValid, dirtyFields }, control, update }) => {
          setHasValuesChanged(!!Object.keys(dirtyFields).length)
          return (
            <div className='flex flex-col gap-[23px]'>
              <p className='source-secondary-title text-text'>{`${t('Step')} ${step} - ${stepTitle}`}</p>
              {passportFormStepsData[step - 1].stepFields.map(stepField => getFormField(stepField, t, control))}
              {passportFormStepsData[step - 1].isBottomWarning && (
                <div className='text-red'>
                  {t('Check all the filled data, after saving it will not be possible to change it')}
                </div>
              )}
              <div className='w-full flex gap-[23px] mt-5 justify-end'>
                <Button
                  variant='text'
                  className='!w-[85px]'
                  onClick={() => [step === 1 ? handleClose() : setStep((step - 1) as Steps), setTimeout(update)]}
                  data-testid='closeButton'
                >
                  {step === 1 ? t('common:cancel') : t('common:Back')}
                </Button>
                <Button
                  onClick={() => [step === 4 ? onClose() : setStep((step + 1) as Steps), setTimeout(update)]}
                  className='!w-[176px]'
                  disabled={!isValid}
                  type='submit'
                  loading={isLoading}
                  data-testid='submitButton'
                >
                  {step === 4 ? t('common:Save') : t('common:Next')}
                </Button>
              </div>
            </div>
          )
        }}
      </Form>
    </div>
  )
}
