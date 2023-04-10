import { useEffect } from 'react'

import type { FriendshipsQuery } from 'types/graphql'

import { type CellSuccessProps, type CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FriendshipsQuery($userId: Int!) {
    friendshipsByUser(userId: $userId) {
      id
      userId1
      userId2
      user {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  friendshipsByUser,
}: CellSuccessProps<FriendshipsQuery>) => {
  useEffect(() => console.log(friendshipsByUser))
  return (
    <ul>
      {friendshipsByUser.map((item) => {
        return <li key={item.id}></li>
      })}
    </ul>
  )
}
