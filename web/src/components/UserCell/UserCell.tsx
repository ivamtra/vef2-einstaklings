import { useEffect } from 'react'

import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useQuery,
} from '@redwoodjs/web'

export const QUERY = gql`
  query FindUserQuery($id: Int!) {
    user: user(id: $id) {
      id
      email
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
      profilePic
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

  useEffect(() => {
    console.log(data?.friends[0].id)
  })
  // TODO error höndlun
  const { loading, data, error } = useQuery(friendsQuery, {
    variables: { userId: user.id },
  })
  return (
    <div>
      <p>{user.email}</p>
      <img src="https://picsum.photos/200" alt="" />
      <h4 className="text-xl">Friends</h4>
      {/* Listi af vinum */}

      {/* TODO Setja i component */}
      {data?.friends?.map((friend) => {
        return (
          <>
            <ul key={friend.id}>
              <p>{friend.email}</p>
              <Link to={routes.profile({ id: friend.id })}>Link</Link>
            </ul>
          </>
        )
      })}
      {/* TODO Setja i component */}
    </div>
  )
}
