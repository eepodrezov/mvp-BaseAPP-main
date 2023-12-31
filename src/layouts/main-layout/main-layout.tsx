import { FC, PropsWithChildren } from 'react'
import { Navbar } from '@/widgets/navbar' 
import { TabItem } from '@/shared/ui/tabs'
import { useTranslate } from '@/shared/lib'
import MainPageIcon from '@/shared/assets/icons/navbar/main-page.svg'
import BasketFullIcon from '@/shared/assets/icons/navbar/basket-full.svg'
import BasketEmptyIcon from '@/shared/assets/icons/navbar/basket-empty.svg'
import RecipesIcon from '@/shared/assets/icons/navbar/recipes.svg'
import ListIcon from '@/shared/assets/icons/navbar/list.svg'
import ProfileIcon from '@/shared/assets/icons/navbar/profile.svg'
import { useRouter } from 'next/router'
import { UIButton } from '@/features/ui-button'
import { GlobalSystemButtons } from '@/shared/ui'


const isBasketEmpty = true

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslate(['common'])
  const router = useRouter()
  const isUI = router.pathname.includes('ui')
  const tabs: TabItem[] = [
    { name: t('Catalog'), url:'app/catalog', icon: <MainPageIcon />},
    { name: t('Basket'),url:'app/basket', icon: isBasketEmpty ? <BasketEmptyIcon /> : <BasketFullIcon />},
    { name: t('Recipes'),url:'app/recipes', icon: <RecipesIcon />},
    { name: t('Product List'),url:'app/list', icon: <ListIcon />},
    { name: t('Profile'),url:'app/profile', icon: <ProfileIcon />}
  ]
  return (
  <div className='w-screen px-5 relative flex justify-center items-center'>
    <GlobalSystemButtons>
      <UIButton />
    </GlobalSystemButtons>
    <div className='pb-[80px] w-full'>{children}</div>
    {!isUI && <Navbar tabs={tabs}  className='w-full fixed bottom-0 border-t border-gray-light'/>}
  </div>
)}

