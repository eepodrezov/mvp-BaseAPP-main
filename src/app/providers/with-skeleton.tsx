import { FC } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

const withSkeleton =
  <R,>(Component: FC<R>): FC<R> =>
  (props: R) => {
    return (
      <SkeletonTheme
        inline
        borderRadius={10}
        baseColor='rgba(245, 245, 245, .4)'
        highlightColor='rgba(244, 244, 244, 1)'
      >
        <Component {...props} />
      </SkeletonTheme>
    )
  }

export default withSkeleton
