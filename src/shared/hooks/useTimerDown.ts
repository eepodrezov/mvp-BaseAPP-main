import { useState, useEffect } from 'react'
import { getTwoDigitsNumber } from '../helpers'

export const useTimerDown = (delay: number, units?: { minutes: string; seconds: string; hours?: string }) => {
  const [seconds, setSeconds] = useState(delay)

  useEffect(() => {
    const interval = setInterval(() => setSeconds(prev => prev && --prev), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const formatedSeconds = getTwoDigitsNumber(seconds % 60)
  const formatedMinutes = getTwoDigitsNumber(Math.floor((seconds / 60) % 60))
  const formatedHours = getTwoDigitsNumber(Math.floor(seconds / 3600))

  const formatedDelay = `${formatedMinutes}:${formatedSeconds}`
  const formatedDelayWithUnits = units && `${formatedMinutes} ${units.minutes} ${formatedSeconds} ${units.seconds}`
  const formatedDelayWithUnitsAndHours =
    units && `${formatedHours} ${units.hours} ${formatedMinutes} ${units.minutes} ${formatedSeconds} ${units.seconds}`

  return {
    seconds,
    formatedDelay,
    formatedDelayWithUnits,
    formatedDelayWithUnitsAndHours,
    setSeconds: (delay: number) => setSeconds(delay),
  }
}
