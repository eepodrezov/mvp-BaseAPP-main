import { FCWithChildren } from '@/shared/@types'

interface ParagraphProps {
  title: string
}

export const Paragraph: FCWithChildren<ParagraphProps> = ({ title, children }) => {
  return (
    <div className='flex flex-col gap-5'>
      <p className='self-start min-[1280px]:source-secondary-title source-mobile-text font-bold'>{title}</p>
      <p>{children}</p>
    </div>
  )
}
