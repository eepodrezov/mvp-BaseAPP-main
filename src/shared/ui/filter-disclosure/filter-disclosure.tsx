import { FCWithChildren } from '@/shared/@types'
import { Disclosure } from '@headlessui/react'
import Arrow from '@/shared/assets/icons/common/select-arrow.svg'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { Fragment, useRef } from 'react'

export interface FilterDisclosureProps {
  label?: string
  panelClassName?: string
  defaultOpen?: boolean
}

export const FilterDisclosure: FCWithChildren<FilterDisclosureProps> = ({
  children,
  label,
  className,
  panelClassName,
  defaultOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Disclosure defaultOpen={defaultOpen} as='div' className={cn('bg-white border-b border-black', className)}>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex items-center justify-between w-full px-5 py-large'>
            <p className='text-black croogla-secondary-text'>{label}</p>
            {/* Не обернул кнопкой, т.к. весь блок ей обернут */}
            <Arrow
              className={cn('stroke-currentColor transition-transform', {
                'rotate-180': open,
              })}
            />
          </Disclosure.Button>

          <Disclosure.Panel as={Fragment} static>
            <motion.div
              ref={ref}
              initial={{ height: 0, overflow: 'hidden' }}
              animate={{
                height: open ? ref.current?.scrollHeight || 0 : 0,
                ...(!open && { overflow: 'hidden' }),
                transitionEnd: { overflow: open ? 'visible' : 'hidden', height: open ? 'max-content' : 0 },
              }}
              exit={{ overflow: 'visible' }}
              transition={{ type: 'just' }}
            >
              <div className={cn('pb-large px-5', panelClassName)}>{children}</div>
            </motion.div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
