import { FileModel } from '@/shared/@types'

export type CarImageSize = 'small' | 'big' | 'origin'

export function getCarImage(imageSize: CarImageSize, image?: FileModel) {
  switch (imageSize) {
    case 'small':
      return image?.smallImagePath || image?.pathS3
    case 'big':
      return image?.mediumImagePath || image?.pathS3
    case 'origin':
      return image?.originalImagePath || image?.pathS3
    default:
      return image?.mediumImagePath || image?.pathS3
  }
}

export function checkIsAnyPhoto(image?: FileModel): boolean {
  return !!(image?.pathS3 || image?.smallImagePath || image?.mediumImagePath || image?.originalImagePath)
}
