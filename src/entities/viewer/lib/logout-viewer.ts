import { destroyCookie } from 'nookies'

export const logoutViewer = (setViewer: (viewer: undefined) => void) => {
  destroyCookie(null, 'access_token', { path: '/' })
  destroyCookie(null, 'refresh_token', { path: '/' })
  setViewer(undefined)
}
