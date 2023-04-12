import { render } from '@redwoodjs/testing/web'

import FriendList from './FriendList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FriendList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FriendList />)
    }).not.toThrow()
  })
})
