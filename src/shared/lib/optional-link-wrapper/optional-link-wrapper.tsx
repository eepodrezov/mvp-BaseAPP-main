import { FCWithChildren } from '@/shared/@types'
import Link from 'next/link'

export interface OptionalLinkWrapperProps {
  href?: string
  newTab?: boolean
  isDownload?: boolean
}

export const OptionalLinkWrapper: FCWithChildren<OptionalLinkWrapperProps> = ({
  children,
  href,
  newTab,
  isDownload,
}) => {
  return (
    <>
      {href ? (
        <Link href={href} download={isDownload}>
          <a
            className='contents'
            {...(newTab && { target: '_blank', rel: 'noreferrer noopener', download: isDownload })}
          >
            {children}
          </a>
        </Link>
      ) : (
        children
      )}
    </>
  )
}
