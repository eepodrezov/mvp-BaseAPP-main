import React from 'react'
import Joyride from 'react-joyride'
import { ONBOARDING_STEPS } from './onboarding-steps'

export const Onboarding = () => {

  return (
    <Joyride
          steps={ONBOARDING_STEPS}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
      />
  )
}
