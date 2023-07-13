import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import { prefetchCarById } from '@/entities/car'
import { CarPageView } from '@/views'
import { getNumberFromString } from '@/shared/helpers'
import { ContentLayout } from '@/layouts/content-layout'
import { NextPageWithLayout } from '@/shared/@types'
import { BlockedPagePlug } from '@/shared/ui'
import { useTranslate } from '@/shared/lib'

export interface CarPageProps {
  emptyCar?: boolean
}

const CarPage: NextPageWithLayout<CarPageProps> = ({ emptyCar }: CarPageProps) => {
  const { t } = useTranslate(['common', 'car'])
  if (emptyCar)
    return (
      <BlockedPagePlug
        text={t('car:Car_is_not_available')}
        extraContent={t('car:Sorry_this_vehicle_is_not_available')}
      />
    )
  return <CarPageView />
}

CarPage.Layout = ({ children, emptyCar = false }) => (
  <ContentLayout withHeaderMobile={emptyCar} footerClassName='mb-[82px] desktop:mb-0'>
    {children}
  </ContentLayout>
)

//возвожно пригодится
// export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
//   const response = await Promise.allSettled(
//     locales?.map(locale => fetchCars({ params: { fields: ['id', 'locale'], pagination: { pageSize: 12 }, locale } })) ||
//       []
//   )

//   const succefulPromises = response.filter(promise => promise.status === 'fulfilled') as PromiseFulfilledResult<
//     AxiosResponse<CollectionResponse<Car>, undefined>
//   >[]

//   const carsData = succefulPromises.map(promise => promise.value.data.items).flat()

//   return {
//     paths: carsData.map(({ id }) => ({ params: { id: String(id) } })),
//     fallback: true,
//   }
// }

// This also gets called at build time
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { params, locale } = ctx
  const queryClient = new QueryClient()

  const carId = getNumberFromString(params?.id as string)

  const { response: car } = await prefetchCarById(carId)(ctx, queryClient, { locale })

  return {
    props: {
      ...(car ? { dehydratedState: dehydrate(queryClient) } : { emptyCar: true }),
      ...(await serverSideTranslations(locale!, ['common', 'car', 'booking', 'delivery'])),
    },
  }
}

export default CarPage
