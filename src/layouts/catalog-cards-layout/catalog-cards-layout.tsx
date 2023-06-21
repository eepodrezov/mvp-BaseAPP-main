import { FC, PropsWithChildren } from 'react'

export const CatalogCardsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
  <div className='px-large grid gap-3 grid-cols-2 w-full'>
    {children}
  </div>
)}

