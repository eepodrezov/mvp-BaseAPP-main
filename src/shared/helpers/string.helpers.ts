export const getNumberFromString = (str = '') => +str.replace(/\D+/g, '')

export const getOnlyDigitsString = (str = '') => str.replace(/\D+/g, '')

export const getTwoDigitsNumber = (value: number) => (value < 10 ? `0${value}` : value)

export const getOnlyNumbersAndLetters = (str = '') => str.replace(/[^a-zа-яA-ZА-Я0-9]+/g, '')

export const getTrimmedString = (str = '', startLength = 0, endLength: number) => str.slice(startLength, endLength)

export const getStringWithPhoneMask = (str = '') =>
  str && `+${str.slice(0, 1)}(${str.slice(1, 4)})-${str.slice(4, 7)}-${str.slice(7, 9)}-${str.slice(9, 11)}`
