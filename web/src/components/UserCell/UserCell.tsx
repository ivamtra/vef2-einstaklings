import { useEffect } from 'react'

import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useQuery,
} from '@redwoodjs/web'

import FriendshipsCell from '../FriendshipsCell'

export const QUERY = gql`
  query FindUserQuery($id: Int!) {
    user: user(id: $id) {
      id
      email
      friends {
        userId2
      }
    }
  }
`

export const friendsQuery = gql`
  query findFriends($userId: Int!) {
    friends: friends(userId: $userId) {
      id
      email
      friends {
        userId2
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  useEffect(() => {
    console.log(loading)
    console.log(data)
  })
  const { loading, data, error } = useQuery(friendsQuery, {
    variables: { userId: user.id },
  })
  return (
    <div>
      <p>{user.email}</p>
      <img src="https://picsum.photos/200" alt="" />
      <h4 className="text-xl">Friends</h4>
      {user.friends.map((item) => {
        return <ul key={item.userId2}>{item.userId2}</ul>
      })}
      <FriendshipsCell userId={user.id} />
    </div>
  )
}
