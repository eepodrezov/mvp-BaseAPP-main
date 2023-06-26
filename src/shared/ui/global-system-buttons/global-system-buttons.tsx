import { FCWithChildren } from '@/shared/@types'

export const GlobalSystemButtons:FCWithChildren = ({
    children
}) => {
  return (
    <div 
        className="fixed top-2 right-2"
    >
        {children}
    </div>
)}
