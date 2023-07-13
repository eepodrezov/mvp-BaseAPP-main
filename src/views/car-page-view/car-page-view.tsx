import { useEffect, useState } from 'react'
import { CarOverview, CarDescription, useFavoritesRequest, getCarPrice, getSortingImages } from '@/entities/car'
import { CarPageMobileHeader } from './car-page-mobile-header'
import { CarPageMainInfo } from './car-page-main-info'
import { Carousel } from '@/shared/ui/carousel'
import {
  ShareButton,
  FavoriteButton,
  Button,
  ButtonMobileFixedWrapper,
  BlockedPagePlug,
  Tooltip,
  Informer,
  Modal,
} from '@/shared/ui'
import { CarPageImagesBlock } from './car-page-images-block'
import { getNumberFromString } from '@/shared/helpers'
import { useGetCar } from '@/entities/car'
import { useRouter } from 'next/router'
import { DeliveryCalculator, deliveryCarIdAtom, useGetDelivery } from '@/features/delivery'
import { notificationModalData, useTranslate } from '@/shared/lib'
import { useCreateOrder } from '@/entities/order'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { ROLE_ADMIN, viewerAtom } from '@/entities/viewer'
import { useModalState } from '@/shared/hooks'
import { signInModalAtom } from '@/features/auth'
import cn from 'classnames'
import { serverSideValidationOrderCreate } from './lib'
import Head from 'next/head'
import { Slider } from '@/shared/ui/slider'
import { carSliderModalAtom } from '@/entities/car'

const sideBlockBoxShadowRules =
  'desktop:shadow-[0px_0px_30px_rgba(0,0,0,0.11)] desktop:rounded-large desktop:bg-white desktop:border-transparent'

export const CarPageView = () => {
  const { t } = useTranslate(['common', 'car', 'booking'])
  const router = useRouter()
  const viewer = useAtomValue(viewerAtom)
  const setNotificationModalData = useUpdateAtom(notificationModalData)
  const { onOpen } = useModalState(signInModalAtom)
  const {
    onOpen: onOpenSlideModal,
    isOpen: isOpenSlideModal,
    onClose: onCloseSlideModal,
  } = useModalState(carSliderModalAtom)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const carId = getNumberFromString(router.query.id as string)

  const setDeliveryCarId = useUpdateAtom(deliveryCarIdAtom)
  useEffect(() => {
    carId && setDeliveryCarId(carId)
    return () => setDeliveryCarId(0)
  }, [carId])

  const { data: car, isLoading } = useGetCar(carId, {
    keepPreviousData: true,
  })

  const { mutate, isLoading: isOrderCreating } = useCreateOrder({
    onSuccess: data => router.push(`/booking/${data.id}`),
    onError: err => {
      serverSideValidationOrderCreate(t, err, setNotificationModalData, router), err
    },
  })

  const [isFavorite, setIsFavorite] = useState(car?.isFavorite)

  useEffect(() => {
    setIsFavorite(car?.isFavorite)
  }, [car?.isFavorite])

  const { mutate: favorite } = useFavoritesRequest(t)

  const { data: calculatorValue } = useGetDelivery({
    retry: false,
  })

  useEffect(() => {
    router.beforePopState(() => true)
    return () => {
      router.beforePopState
    }
  }, [])

  if (isLoading || !car) return <div>loading</div>

  const bookingButtonText = `${t('booking:Booking')} ${t('for')} ${getCarPrice(calculatorValue?.bookingPrice)} ${t(
    'RUB'
  )}`

  const onBooking = () => (viewer ? mutate(carId) : onOpen())

  const onFavorite = () => (viewer ? [favorite({ id: carId }), setIsFavorite(prev => !prev)] : onOpen())

  const isAdmin = viewer?.roles.includes(ROLE_ADMIN)

  const informerText = isAdmin
    ? t('booking:The_car_is_no_longer_available_for_sale.')
    : t('booking:This_car_is_already_booked_by_you')

  if (!isAdmin && car.blocked)
    return (
      <BlockedPagePlug
        text={t('car:Sorry_Car_is_not_available')}
        extraContent={<Button href='/'>{t('car:Go_to_catalog')}</Button>}
      />
    )

  const sortingImages = getSortingImages(car.images)

  return (
    <>
      <div className='tablet:py-15'>
        <Head>
          <title>{car.name}</title>
        </Head>
        <CarPageMobileHeader isFavorite={isFavorite} onFavorite={onFavorite} />
        <div className='mt-base desktop:p-[60px] tablet:px-0 py-5 desktop:pb-[37px] croogla-text flex justify-between items-center'>
          <span className='px-5 desktop:croogla-title'>{car.name}</span>
          <span className='hidden desktop:flex desktop:gap-small'>
            <FavoriteButton withText isFavorite={isFavorite} isSmallIcon onClick={onFavorite} />
            <ShareButton />
          </span>
        </div>
        <div className='flex flex-col gap-large main:flex-row '>
          <div className='mt-base w-full pt-5 pl-5 desktop:hidden transition-colors'>
            <Carousel
              onSlideClick={index => [setCurrentImageIndex?.(index), onOpenSlideModal()]}
              images={sortingImages}
              slideWidth={266}
              slideHeight={200}
              slideBorderRadius={20}
              spaceBetween={20}
            />
          </div>
          <CarPageImagesBlock
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            images={sortingImages}
            className='hidden desktop:flex desktop:mx-auto'
          />
          <div className='desktop:max-w-[600px] desktop:m-auto'>
            <CarPageMainInfo
              car={car}
              className={cn('border-b p-5 mb-0.5 desktop:mb-large', sideBlockBoxShadowRules)}
            />
            <div className='desktop:min-w-[420px] p-5 desktop:rounded-large desktop:shadow-panel'>
              <DeliveryCalculator
                price={car.price}
                location={car?.location}
                className={cn({ 'mb-medium': calculatorValue })}
              />
              {(car.booked && !isAdmin) || ((car.blocked || car.booked || !car.visible) && isAdmin) ? (
                <Informer>{informerText}</Informer>
              ) : (
                calculatorValue && (
                  <Tooltip isActive={car.booked} label={t('booking:This_car_is_not_available_for_booking')}>
                    <Button
                      fullWidth
                      className='hidden desktop:flex desktop:min-h-[60px]'
                      childrenClassName='croogla-sub-title'
                      loading={isOrderCreating}
                      onClick={onBooking}
                      disabled={car.booked}
                    >
                      {bookingButtonText}
                    </Button>
                  </Tooltip>
                )
              )}
            </div>
          </div>
        </div>
        <CarOverview car={car} className='border-y desktop:border-none mt-small' />
        <CarDescription car={car} className='p-5 mb-[60px] desktop:mb-0' />
        <ButtonMobileFixedWrapper
          disabled={car.booked || car.blocked}
          fullWidth
          loading={isOrderCreating}
          onClick={onBooking}
          label={t('booking:This_car_is_not_available_for_booking')}
        >
          {bookingButtonText}
        </ButtonMobileFixedWrapper>
      </div>
      <Modal
        onFullWindow
        withCloseIconBG
        isOpen={isOpenSlideModal}
        onClose={onCloseSlideModal}
        className='p-0 w-full h-full max-h-full aspect-video !bg-transparent flex justify-center items-center rounded-none overflow-hidden'
      >
        <div className='w-full h-full'>
          <Slider
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            loop
            isModal
            allowTouchMove
            initialSlide={currentImageIndex}
            images={sortingImages}
            slideBorderRadius={0}
            shownImagesCount={1}
            withRedLoader
          />
        </div>
      </Modal>
    </>
  )
}
