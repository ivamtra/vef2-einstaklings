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
      profilePic
      name
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
      name
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
    console.log(data?.friends[0]?.id)
  })
  // TODO error höndlun
  const { loading, data, error } = useQuery(friendsQuery, {
    variables: { userId: user.id },
  })
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="text-3xl font-bold text-gray-600">{user.name}</p>
      <img
        className="mx-auto mt-2 h-48 w-48 rounded-full"
        src={user.profilePic ? user.profilePic : 'https://picsum.photos/200'}
        alt=""
      />
      <h4 className="mt-8 text-xl font-semibold text-gray-600">Friends</h4>
      {/* List of friends */}
      {data?.friends?.map((friend) => {
        return (
          <ul key={friend.id} className="mt-4">
            <li className="mt-4 flex items-center">
              <img
                src={friend.profilePic}
                alt=""
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-lg">{friend.name}</p>
                <Link
                  to={routes.profile({ id: friend.id })}
                  className="text-blue-500 transition duration-200 hover:text-blue-700"
                >
                  View Profile
                </Link>
              </div>
            </li>
          </ul>
        )
      })}
      {/* TODO Setja i component */}
    </div>
  )
}
