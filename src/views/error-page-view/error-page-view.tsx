import { FC } from 'react'
import { useTranslate } from '@/shared/lib'
import clientErrorImage from '@/shared/assets/images/404-error-img.png'
import serverErrorImage from '@/shared/assets/images/500-error-img.png'
import { NextImage } from '@/shared/ui'

export interface ErrorPageViewProps {
  errorType: 'server' | 'client'
}

export const ErrorPageView: FC<ErrorPageViewProps> = ({ errorType }) => {
  const { t } = useTranslate(['common'])

  return (
    <div className='max-w-[1440px] w-full text-center flex items-center justify-center flex-wrap gap-[60px] text-black desktop:flex-row desktop:mt-[130px] tablet:mt-[240px] desktop:gap-[180px]'>
      <div className='max-w-[335px] desktop:max-w-[379px]'>
        <h1 className='croogla-title text-[160px] mb-large desktop:text-[180px]'>
          {errorType === 'server' ? t('500') : t('404')}
        </h1>
        <p className='mb-5 croogla-title'>{errorType === 'server' ? t('serverError') : t('clientError')}</p>
        <p className='px-5 source-text'>{errorType === 'server' ? t('serverErrorMessage') : t('clientErrorMessage')}</p>
      </div>
      <NextImage width={560} height={467} src={errorType === 'server' ? serverErrorImage.src : clientErrorImage.src} />
    </div>
  )
}
