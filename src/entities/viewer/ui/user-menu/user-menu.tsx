import { ButtonHTMLAttributes, FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import UserIcon from '@/shared/assets/icons/common/user.svg'
import Arrow from '@/shared/assets/icons/common/select-arrow.svg'
import { Button } from '@/shared/ui'
import { viewerAtom } from '../../model'
import { useAtom } from 'jotai'
import { useTranslate } from '@/shared/lib'
import { useModalState } from '@/shared/hooks'
import { logoutViewer, PROFILE_URL } from '../../lib'
import { signInModalAtom } from '@/features'
import { useRouter } from 'next/router'

export const UserMenu: FC<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  const { t } = useTranslate(['common'])
  const [viewer, setViewer] = useAtom(viewerAtom)
  const router = useRouter()
  const { onOpen } = useModalState(signInModalAtom)
  const isProfile = router.pathname.includes(PROFILE_URL)
  return (
    <Menu as='div'>
      <Menu.Button as={Fragment}>
        <Button
          variant='bordered-icon'
          onClick={() => viewer || onOpen()}
          className='!min-h-[40px] tablet:w-[50px] tablet:h-[50px]'
          {...props}
        >
          <UserIcon className='fill-currentColor' />
        </Button>
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        {viewer && (
          <Menu.Items className='absolute -translate-x-full list'>
            <Menu.Item disabled={isProfile}>
              <li className='group gap-small !min-h-[66px]' onClick={() => router.push(PROFILE_URL)}>
                {/* TODO: добавить тернарник на аватарку, когда будет модель */}
                <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gray'>
                  <UserIcon className='fill-border' />
                </div>
                <span className='w-[136px] truncate text-left group-hover:font-normal'>{viewer.firstName}</span>
                <Arrow className='-rotate-90 stroke-black' />
              </li>
            </Menu.Item>
            <Menu.Item>
              <li
                className='font-bold hover:text-red'
                onClick={() => {
                  logoutViewer(setViewer)
                  isProfile && router.push('/')
                }}
              >
                {t('logout')}
              </li>
            </Menu.Item>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  )
}
