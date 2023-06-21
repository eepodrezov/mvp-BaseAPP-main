import { LANG_EN } from '@/shared/config'
import { ButtonHTMLAttributes, FC } from 'react'
import { useTranslate } from './hooks'

export const ChangeLanguageButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...rest }) => {
  const { toggleLanguage, i18n } = useTranslate()

  return (
    <button
      {...rest}
      key='lang'
      className='text-black croogla-text hover:underline active:no-underline disabled:text-border disabled:no-underline disabled:cursor-not-allowed'
      onClick={toggleLanguage}
    >
      {i18n.language === LANG_EN ? 'RU' : 'EN'}
    </button>
  )
}
