import { Nullable } from '@/shared/@types'
import Skeleton from 'react-loading-skeleton'

export const renderInfo = (name: string, value?: Nullable<string>, loading?: boolean, withName?: boolean) =>
  loading ? (
    <Skeleton className='!w-40' />
  ) : (
    <>
      {withName && <p className='source-mobile-text main:source-text'>{name}</p>}
      <p className='source-mobile-title main:source-secondary-title'>{value}</p>
    </>
  )
