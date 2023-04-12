// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PostForm> = (args) => {
//   return <PostForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import PostForm from './PostForm'

export const generated = () => {
  return <PostForm />
}

export default {
  title: 'Components/PostForm',
  component: PostForm,
} as ComponentMeta<typeof PostForm>
