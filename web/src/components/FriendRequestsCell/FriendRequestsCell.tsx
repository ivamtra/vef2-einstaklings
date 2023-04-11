import { useEffect } from 'react'

import { FaUserFriends } from 'react-icons/fa'
import type { FriendRequestsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FriendRequestCell from '../FriendRequestCell'

export const QUERY = gql`
  query FriendRequestsQuery($userId: Int!) {
    recievingFriendRequests(userId: $userId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  recievingFriendRequests,
}: CellSuccessProps<FriendRequestsQuery>) => {
  useEffect(() => console.log(recievingFriendRequests))

  return (
    <>
      <FaUserFriends className=" w-5 text-blue-500" />

      <ul>
        {recievingFriendRequests.map((item) => {
          return (
            <li key={item.id}>
              <FriendRequestCell id={item.id} />
            </li>
          )
        })}
      </ul>
    </>
  )
}
