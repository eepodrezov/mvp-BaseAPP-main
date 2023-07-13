import { hasFiltersChangedAtom, isFiltersApplyAtom } from '@/entities/car'
import { FCWithClassName } from '@/shared/@types'
import { useTranslate } from '@/shared/lib'
import { useUpdateAtom } from 'jotai/utils'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { Button } from '@/shared/ui'
import cn from 'classnames'
import { offset, shift, useFloating, useInteractions, useRole } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'
import { mergeRefs } from '@/shared/helpers'
import ApplyButton from '@/shared/assets/icons/sidebar-icons/apply-button.svg'
import { useAtom, useAtomValue } from 'jotai'
import { lastChangedFilter } from '../../model'
import { useTimerDown } from '@/shared/hooks'

export const FiltersApplyButton: FCWithClassName<{ children?: ReactElement; delayClickable?: number }> = ({
  children,
  delayClickable = 3,
  className = '',
}) => {
  const { t } = useTranslate(['common'])

  const setIsFiltersApply = useUpdateAtom(isFiltersApplyAtom)
  const [changedFilter, setChangedFilter] = useAtom(lastChangedFilter)
  const hasFiltersChanged = useAtomValue(hasFiltersChangedAtom)
  const [open, setOpen] = useState(false)
  const filterName = children?.props.name
  const { seconds, setSeconds } = useTimerDown(0)

  useEffect(() => {
    setChangedFilter(filterName)
    setSeconds(delayClickable)
  }, [children?.props.value, children?.props?.selectedTab, children?.props?.selectedIds])

  useEffect(() => {
    setOpen(!!(changedFilter === filterName && seconds))
  }, [changedFilter, seconds])

  const applyFilters = () => {
    setOpen(false)
    setIsFiltersApply(true)
  }

  const { x, y, reference, floating, context } = useFloating({
    placement: 'right',
    open,
    middleware: [offset({ mainAxis: 16, crossAxis: 10 }), shift({ padding: 8 })],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([useRole(context, { role: 'tooltip' })])

  const ref = useMemo(() => mergeRefs([reference, (children as any).ref]), [reference, children])

  return (
    <>
      <div {...getReferenceProps({ ref })}>{children}</div>
      <AnimatePresence>
        {hasFiltersChanged && changedFilter === filterName && open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            {...getFloatingProps({
              ref: floating,
              className: cn(
                'hidden desktop:flex flex items-center justify-center bg-white min-h-[36px] group rounded-base drop-shadow-base z-10',
                className
              ),
              style: {
                position: 'absolute',
                top: y ?? 0,
                left: x ?? 0,
              },
            })}
          >
            <ApplyButton className='absolute fill-white group-hover:stroke-red stroke-black pointer-events-none' />
            <Button variant='text' onClick={applyFilters} className='w-32 h-[52px]'>
              {t('Show')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
