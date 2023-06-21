import Arrow from '@/shared/assets/icons/common/pagination-arrow.svg'
import cn from 'classnames'
import { FCWithClassName } from '@/shared/@types'

export interface PaginationButtonProps {
  onClick: () => void
  type: 'next' | 'prev'
  double?: boolean
  disabled?: boolean
}

export const PaginationButton: FCWithClassName<PaginationButtonProps> = ({ type, double, className, ...rest }) => {
  return (
    <button
      className={cn(
        'flex items-center border py-[9px] px-3 border-transparent rounded-full group pagination-arrow active:enabled:border-black desktop:hover:enabled:border-black',
        className,
        {
          'rotate-180': type === 'next',
          '!px-[7px]': double,
        }
      )}
      {...rest}
      data-testid='pagination-arrow-button'
    >
      {double ? (
        <span className='flex'>
          <Arrow className='fill-black w-3 h-5 group-disabled:fill-border' />
          <Arrow className='fill-black w-3 h-5 group-disabled:fill-border' />
        </span>
      ) : (
        <Arrow className='fill-black w-3 h-5 group-disabled:fill-border' />
      )}
    </button>
  )
}
