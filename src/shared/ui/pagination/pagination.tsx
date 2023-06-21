import { Dispatch, SetStateAction, useMemo } from 'react'
import Dots from '@/shared/assets/icons/common/dots.svg'
import cn from 'classnames'
import { PaginationButton } from './pagination-button'
import { useWindowDimensions } from '@/shared/hooks'
import { FCWithClassName } from '@/shared/@types'

export interface PaginationProps {
  currentPage: number
  onChange: Dispatch<SetStateAction<number>>
  totalPageCount: number
  sideShownCount?: number
}

export const Pagination: FCWithClassName<PaginationProps> = ({
  currentPage,
  onChange,
  totalPageCount,
  sideShownCount,
  className,
}) => {
  const { isMobile } = useWindowDimensions()

  const countedSideShownCount = sideShownCount || isMobile ? 1 : 2
  const isPrevDisabled = currentPage === 1
  const isNextDisabled = currentPage >= totalPageCount

  const leftShownOffset = currentPage - (isMobile ? 0 : 1) - countedSideShownCount
  const rightShownOffset =
    totalPageCount - (currentPage + countedSideShownCount) + (currentPage === totalPageCount ? 1 : 0)

  const leftShownCount = rightShownOffset > 0 ? countedSideShownCount : countedSideShownCount - rightShownOffset
  const rightShownCount = leftShownOffset > 0 ? countedSideShownCount : countedSideShownCount - leftShownOffset

  const shouldShowLeftDots =
    currentPage - countedSideShownCount - (isMobile ? 0 : 1) > 1 &&
    currentPage - (isMobile ? 0 : 1) - leftShownCount! !== 1
  const shouldShowRightDots = isMobile
    ? !shouldShowLeftDots && totalPageCount > 1
    : currentPage + countedSideShownCount + 1 < totalPageCount && currentPage + 1 + rightShownCount! !== totalPageCount
  const shouldShowTotalPage = isMobile
    ? (!shouldShowLeftDots || currentPage === totalPageCount) && totalPageCount > 1
    : totalPageCount > 1

  const pageDash = countedSideShownCount * 2 + 1

  const renderButton = (page: number) => (
    <button
      key={page}
      className='group hover:border-b hover:text-black'
      onClick={() => onChange(page)}
      data-testid='pagination-page-button'
    >
      <p
        className={cn('croogla-text text-text group-hover:text-black group-active:text-black', {
          ['!text-black']: currentPage === page,
        })}
      >
        {page}
      </p>
    </button>
  )

  const shownPagesArray = useMemo(() => {
    return Array.from({ length: totalPageCount }, (_, i) => ++i)
      .filter(
        el =>
          el <= currentPage + rightShownCount! &&
          el >= currentPage - leftShownCount! &&
          el !== 1 &&
          el !== totalPageCount
      )
      .map(page => renderButton(page))
  }, [currentPage, leftShownCount, rightShownCount])

  const renderDotsButton = (type: 'prev' | 'next') => (
    <button
      className='group pagination-button'
      data-testid={type === 'prev' ? 'pagination-left-dots' : 'pagination-right-dots'}
      onClick={() =>
        onChange(prev => {
          if (type === 'prev') {
            return prev - pageDash > 0 ? prev - pageDash : 1
          }
          return pageDash + currentPage < totalPageCount ? prev + pageDash : totalPageCount
        })
      }
    >
      <Dots className='w-3 h-1 fill-border group-active:fill-primary group-hover:fill-black' />
    </button>
  )

  return (
    <div
      className={cn('flex items-center justify-center flex-nowrap gap-small desktop:gap-large select-none', className)}
    >
      <div className='flex gap-2'>
        <PaginationButton type='prev' onClick={() => onChange(1)} double disabled={isPrevDisabled} />
        <PaginationButton type='prev' onClick={() => onChange(prev => --prev)} disabled={isPrevDisabled} />
      </div>
      <div className='flex gap-5 items-baseline desktop:gap-[26px]'>
        {renderButton(1)}
        {shouldShowLeftDots && renderDotsButton('prev')}
        {totalPageCount > 1 && shownPagesArray}
        {shouldShowRightDots && renderDotsButton('next')}
        {shouldShowTotalPage && renderButton(totalPageCount)}
      </div>
      <div className='flex gap-2'>
        <PaginationButton type='next' onClick={() => onChange(prev => ++prev)} disabled={isNextDisabled} />
        <PaginationButton type='next' onClick={() => onChange(totalPageCount)} double disabled={isNextDisabled} />
      </div>
    </div>
  )
}
