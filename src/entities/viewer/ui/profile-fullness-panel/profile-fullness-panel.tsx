import { Fragment } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ProfileFullnessPanelHeader } from './profile-fullness-panel-header'
import { ProfileFullnessPanelBody } from './profile-fullness-panel-body'

export const ProfileFullness = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button as={Fragment}>
            <div>
              <ProfileFullnessPanelHeader open={open}/>
            </div>
          </Disclosure.Button>
          <Transition
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Disclosure.Panel as='div' className='mt-5 flex flex-col gap-5'>
              <ProfileFullnessPanelBody />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
