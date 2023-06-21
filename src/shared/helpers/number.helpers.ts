export const getNumberWithDevider = (value?: number | string, devider = '.') => {
  return value?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + devider) || ''
}
