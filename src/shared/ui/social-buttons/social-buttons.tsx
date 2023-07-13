import { Button } from '../button'
import WhatsUpIcon from '@/shared/assets/icons/common/whasup-icon.svg'
import TelegramIcon from '@/shared/assets/icons/common/telegram-icon.svg'
import { getSocialContacts, whatsupLinkPrefix, telegramLinkPrefix } from './lib'

export const SocialButtons = () => {
  const { telegram, whatsup } = getSocialContacts()

  if (!telegram || !whatsup) return null

  return (
    <div className='flex gap-5'>
      <a href={`${telegramLinkPrefix}${telegram}`} target='_blank' rel='noreferrer'>
        <Button variant='secondary' className='px-[13px] !bg-white'>
          <TelegramIcon className='fill-currentColor' />
        </Button>
      </a>
      <a href={`${whatsupLinkPrefix}${whatsup}`} target='_blank' rel='noreferrer'>
        <Button variant='secondary' className='px-[13px] !bg-white'>
          <WhatsUpIcon className='fill-currentColor' />
        </Button>
      </a>
    </div>
  )
}
