import type { ComponentMeta, ComponentStory } from '@storybook/react'

import LoginLayout from './LoginLayout'

export const generated: ComponentStory<typeof LoginLayout> = (args) => {
  return <LoginLayout {...args} />
}

export default {
  title: 'Layouts/LoginLayout',
  component: LoginLayout,
} as ComponentMeta<typeof LoginLayout>
