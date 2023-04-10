import { useEffect } from 'react'

import type { PostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PostCell from '../PostCell'

export const QUERY = gql`
  query PostsQuery($userId: Int!) {
    postsByFriends(userId: $userId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ postsByFriends }: CellSuccessProps<PostsQuery>) => {
  useEffect(() => {
    console.log(postsByFriends)
  })
  return (
    <ul>
      {postsByFriends?.map((post) => {
        return (
          <li key={post.id} className="mb-4">
            <PostCell id={post.id} />
          </li>
        )
      })}
    </ul>
  )
}
