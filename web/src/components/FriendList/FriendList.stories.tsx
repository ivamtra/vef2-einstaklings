// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FriendList> = (args) => {
//   return <FriendList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FriendList from './FriendList'

export const generated = () => {
  return <FriendList />
}

export default {
  title: 'Components/FriendList',
  component: FriendList,
} as ComponentMeta<typeof FriendList>
