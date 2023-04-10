import type { ComponentMeta, ComponentStory } from '@storybook/react'

import Layout from './Layout'

export const generated: ComponentStory<typeof Layout> = (args) => {
  return <Layout {...args} />
}

export default {
  title: 'Layouts/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>
