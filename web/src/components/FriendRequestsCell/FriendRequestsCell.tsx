import { useEffect } from 'react'

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

export const Empty = () => {
  return (
    <div className="absolute right-[200px] flex w-[200px] flex-col items-center justify-center gap-3 rounded-lg border bg-white p-2 sm:flex-row">
      No friend requests
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  recievingFriendRequests,
}: CellSuccessProps<FriendRequestsQuery>) => {
  useEffect(() => console.log(recievingFriendRequests))

  return (
    <>
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
