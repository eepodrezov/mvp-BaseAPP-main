import { Story, Meta } from '@storybook/react'
import { DeliveryCalculator, DeliveryCalculatorProps } from './delivery-calculator'

export default {
  title: 'Features/DeliveryCalculator',
  component: DeliveryCalculator,
  argTypes: {
    withTime: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta

const Template: Story<DeliveryCalculatorProps> = args => <DeliveryCalculator {...args} />

export const Default = Template.bind({})
Default.args = {}
