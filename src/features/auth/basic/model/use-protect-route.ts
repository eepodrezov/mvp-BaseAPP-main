import { viewerAtom } from '@/entities/viewer'
import { usePrefetchRouter } from '@/shared/hooks'
import { getTokens } from '@/shared/lib'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

export const useProtectRoute = () => {
  const router = usePrefetchRouter('/')
  const viewer = useAtomValue(viewerAtom)
  const refresh_token = getTokens()?.refresh_token

  useEffect(() => {
    !viewer && !refresh_token && router.push('/')
  }, [viewer])

  return viewer
}
