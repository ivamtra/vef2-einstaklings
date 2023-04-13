import { useEffect } from 'react'

import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
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
  friends,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  useEffect(() => console.log(friends))

  return (
    <div>
      {/* TODO Setja logic í sér component */}

      <h4 className="mt-8 text-xl font-semibold text-gray-600">Friends</h4>
      {/* TODO Setja i component */}
      {/* List of friends */}
      {friends?.map((friend) => {
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
