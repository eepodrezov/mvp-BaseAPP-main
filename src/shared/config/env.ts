import getConfig from 'next/config'

const getEnv = (key: string) => {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

  const envVar = key.startsWith('NEXT_PUBLIC_') ? publicRuntimeConfig[key] : serverRuntimeConfig[key]

  if (!envVar && typeof window === 'undefined') {
    throw new Error(`Env variable ${key} is required`)
  }

  return envVar
}

export const IS_STORYBOOK = process.env.STORYBOOK_ENV

export const BASE_URL = IS_STORYBOOK ? 'http://storybook.mocks:3000' : getEnv('NEXT_PUBLIC_TARGET')
export const TOKEN_PATH = IS_STORYBOOK ? 'token' : getEnv('NEXT_PUBLIC_TOKEN_PATH')
export const API_MOCKING = getEnv('NEXT_PUBLIC_API_MOCKING')
export const COMPANY_PHONE_NUMBER: string = IS_STORYBOOK
  ? '+7 (000)000-00-00,+7 (000)000-00-00'
  : getEnv('NEXT_PUBLIC_COMPANY_PHONE_NUMBER')
export const TECHNICAL_SUPPORT = getEnv('NEXT_PUBLIC_TECHNICAL_SUPPORT')
export const CLIENT_ID = getEnv('NEXT_PUBLIC_CLIENT_ID') as string
export const CLIENT_SECRET = getEnv('NEXT_PUBLIC_CLIENT_SECRET') as string
export const SOCIAL_CONTACTS = getEnv('NEXT_PUBLIC_SOCIAL_CONTACTS')

export const PROJECT_VERSION = `${getEnv('NEXT_PUBLIC_SPRINT_NUMBER')}-${getEnv('NEXT_PUBLIC_DATE_STAMP')}`

// Режим запуска программы
export const NODE_ENV = getEnv('NODE_ENV')
// Режим тестирования
export const isTestEnv = NODE_ENV === 'test'
// Режим разработки
export const isDevEnv = NODE_ENV === 'development'
// Режим продакшена
export const isProdEnv = NODE_ENV === 'production'
