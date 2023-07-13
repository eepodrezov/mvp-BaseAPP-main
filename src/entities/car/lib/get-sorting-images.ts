import { FileModel } from '@/shared/@types'

export const getSortingImages = (images?: FileModel[]) =>
  images?.every(({ orderIndex }) => !!orderIndex)
    ? images.sort((prev, next) => (prev.orderIndex! > next.orderIndex! ? 1 : -1))
    : images

export const getFirstImage = (images?: FileModel[]) => images?.find(({ orderIndex }) => orderIndex === 1) || images?.[0]
