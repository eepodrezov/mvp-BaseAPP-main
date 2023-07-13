import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { LANG_EN, LANG_RU } from '@/shared/config'
import { Language } from '@/shared/@types'
import { setCookie } from 'nookies'

export const useTranslate = (namespace: string[] = []) => {
  const router = useRouter()
  const translation = useTranslation(namespace)

  const lang = translation.i18n.language

  const _changeLocale = (locale: string) => {
    setCookie(null, 'NEXT_LOCALE', locale, { path: '/' })
    return router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale })
  }

  const changeLanguage = (lang: Language) => _changeLocale(lang).then(() => translation.i18n.changeLanguage(lang))

  const toggleLanguage = () => {
    const newLang = lang === LANG_RU ? LANG_EN : LANG_RU
    _changeLocale(newLang).then(() => translation.i18n.changeLanguage(newLang))
  }

  return {
    ...translation,
    changeLanguage,
    toggleLanguage,
  }
}
