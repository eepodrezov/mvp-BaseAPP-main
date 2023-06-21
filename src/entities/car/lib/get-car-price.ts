import { getNumberWithDevider } from '@/shared/helpers'
import { TFunction, Nullable } from '@/shared/@types'

/**
 * Calculates car price with  all ronded and toFixed actions
 * @param originPrice изначальное значение в модели с бека
 * @param formater округление до 5000 тысяч
 * @param withDevider добавление разделителя
 * @param devider вид разделителя
 * @return Returns the rounded up and fixed car price.
 */
export const getCarPrice = (originPrice?: number, formater?: boolean, withDevider = true, devider = ',') => {
  if (originPrice && withDevider) {
    return getNumberWithDevider(formater ? Math.ceil(originPrice / 5000) * 5000 : originPrice?.toFixed(0), devider)
  }
  if (originPrice && !withDevider) {
    return formater ? Math.ceil(originPrice / 5000) * 5000 : originPrice
  }
  return null
}

export const getCarPriceStr = (
  t: TFunction,
  rubValue?: Nullable<string | number>,
  value?: Nullable<string | number>,
  currencyName?: string
) => {
  const valueWithCurrency = `${value} ${t(currencyName || '')}`

  const rubValueWithCurrencyRub = `${rubValue} ${t('RUB')}`

  const subValue = currencyName !== 'RUB' && value ? valueWithCurrency : ''

  const mainValue = rubValue ? rubValueWithCurrencyRub : (value && valueWithCurrency) || ''

  return {
    subValue,
    mainValue,
  }
}
