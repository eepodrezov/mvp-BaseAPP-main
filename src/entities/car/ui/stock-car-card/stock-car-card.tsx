import { FC, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import cn from 'classnames'
import { CarStockItem, serverSideValidationStock, STOCK_COLLECTION_PRIMARY_KEY } from '@/entities/car/lib'
import { ProfileCarCard } from '../profile-car-card'
import { useTranslate, OptionalLinkWrapper, notify, queryClientAtom } from '@/shared/lib'
import { Button, EditableField, Input, Modal, Switch } from '@/shared/ui'
import { useWindowDimensions } from '@/shared/hooks'
import { getNumberWithDevider } from '@/shared/helpers'
import DeleteIcon from '@/shared/assets/icons/common/delete.svg'
import { useStockDeleteRequest, useStockUpdatePriceRequest, useStockUpdateVisibleRequest } from '../../model'
import { AreYouSure } from '@/entities/viewer'
import { useAtomValue } from 'jotai'
export interface StockCarCardProps {
  car?: CarStockItem
  loading?: boolean
  href?: string
}

export const StockCarCard: FC<StockCarCardProps> = ({ car, href, loading }) => {
  const queryClient = useAtomValue(queryClientAtom)

  const { t } = useTranslate(['car', 'common', 'booking'])

  const [isSale, setIsSale] = useState(car?.visible)

  const { isTablet } = useWindowDimensions()

  const [isOpenSure, setIsOpenSure] = useState(false)

  const onOpenSure = () => setIsOpenSure(true)

  const onCloseSure = () => setIsOpenSure(false)

  const { mutate: deleteStock, isLoading: isLoadingDelete } = useStockDeleteRequest({
    onSuccess: () => {
      notify(t('The_vehicle_has_been_removed_from_the_database.'))
      queryClient.invalidateQueries({ queryKey: STOCK_COLLECTION_PRIMARY_KEY })
    },
    onError: err => serverSideValidationStock(t, err),
  })

  const { mutate: updateStockVisible, isLoading: isLoadingUpdate } = useStockUpdateVisibleRequest({
    onSuccess: () => {
      setIsSale(prev => !prev)
      notify(isSale ? t('The_car_is_hidden_from_the_catalog.') : t('The_car_is_displayed_in_the_catalog.'))
      queryClient.invalidateQueries({ queryKey: STOCK_COLLECTION_PRIMARY_KEY })
    },
    onError: err => serverSideValidationStock(t, err),
  })

  const { mutate: updatePrice } = useStockUpdatePriceRequest({
    onSuccess: () => {
      notify(t('Price_changed_successfully'))
      queryClient.invalidateQueries({ queryKey: STOCK_COLLECTION_PRIMARY_KEY })
    },
    onError: err => serverSideValidationStock(t, err),
  })

  if (!car && !loading) return null

  const isDeleted = car?.booked

  const textColor = {
    'text-text': isDeleted,
    'text-black': isSale,
  }

  const classNameText = cn('source-mobile-title main:source-title', textColor)

  return (
    <>
      <OptionalLinkWrapper {...(!isDeleted && isSale && { href })}>
        <ProfileCarCard car={car} isDeleted={isDeleted} isStock loading={loading} withoutIndicatorNotChecked>
          {loading ? (
            <Skeleton width={140} />
          ) : (
            <EditableField
              type='input'
              variantBtn='text'
              withCancelIcon={isTablet}
              renderClassName='max-main:gap-0'
              childrenClassName='!mt-0'
              textClassName={classNameText}
              disabled={isDeleted}
              formatter={value => getNumberWithDevider(value, ',')}
              value={car?.price?.value?.toFixed(0)}
              onSubmit={value => [car && updatePrice({ id: car.price.id, value: Number(value) })]}
              extraContent={<p className={classNameText}>{car?.price?.currency?.name}</p>}
              className='flex items-center gap-[7px] justify-end max-main:col-span-2 cursor-default'
            >
              <Input type='number' classNameContainer='w-[130px]' />
            </EditableField>
          )}
          {isDeleted ? (
            <p className='text-center whitespace-nowrap main:pl-large max-main:col-span-4'>
              {t('booking:Car_is_booked')}
            </p>
          ) : (
            <>
              <Switch
                name='sale'
                loading={loading}
                isRedSwitch
                disabled={isDeleted || isLoadingUpdate}
                onChange={() => [car && updateStockVisible({ id: car?.id })]}
                value={isSale}
                wrapperClassName='main:justify-center !gap-small max-main:col-span-3'
                labelClassName='max-w-fit'
                label={
                  <p className={cn('max-w-fit source-sub-title', textColor)}>
                    {t(isSale ? 'On_sale' : 'Removed_from_sale')}
                  </p>
                }
              />
              {loading ? (
                <Skeleton width={20} containerClassName='justify-self-end mr-small' />
              ) : (
                <Button
                  variant='text'
                  className='max-main:justify-end'
                  childrenClassName='flex gap-small'
                  disabled={isDeleted}
                  loading={isLoadingDelete}
                  onClick={e => [e.preventDefault(), onOpenSure()]}
                >
                  <DeleteIcon className='stroke-currentColor' />
                </Button>
              )}
            </>
          )}
        </ProfileCarCard>
      </OptionalLinkWrapper>
      <Modal isOpen={isOpenSure} onClose={onCloseSure}>
        <AreYouSure
          textNextBtn={t('Delete')}
          handleClose={() => [car && deleteStock({ id: car.id }), onCloseSure()]}
          onClose={onCloseSure}
        >
          {t('Sure?_Removing_the_machine_is_irreversible!')}
        </AreYouSure>
      </Modal>
    </>
  )
}
