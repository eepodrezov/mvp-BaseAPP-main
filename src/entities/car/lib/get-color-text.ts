import { Color } from './types'

export function getCarColorText(colors?: Color[]) {
  return (colors as Color[])?.reduce((acc: string[], color: Color) => [...acc, color.name], []).join(', ')
}
