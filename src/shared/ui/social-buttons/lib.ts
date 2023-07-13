import { SOCIAL_CONTACTS } from '@/shared/config'

export type SocialContacts = {
  telegram?: string
  whatsup?: string
}

export function getSocialContacts() {
  if (SOCIAL_CONTACTS) {
    return SOCIAL_CONTACTS.split(',').reduce((res: SocialContacts, currentContact: string) => {
      const [contactLabel, contactData] = currentContact.split(':')
      return { ...res, [contactLabel]: contactData }
    }, {})
  }
}

export const telegramLinkPrefix = 'https://telegram.im/@'
export const whatsupLinkPrefix = 'https://wa.me/'
