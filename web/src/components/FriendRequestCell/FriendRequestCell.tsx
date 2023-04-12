import { useEffect } from 'react'

import type {
  FindFriendRequestQuery,
  FindFriendRequestQueryVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { QUERY as FriendRequestsQuery } from '../FriendRequestsCell'

export const QUERY = gql`
  query FindFriendRequestQuery($id: Int!) {
    friendRequest: friendRequest(id: $id) {
      id
      sender {
        name
        profilePic
      }
      hidden
      recieverId
      senderId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border bg-white p-2 sm:flex-row">
      Empty
    </div>
  )
}

export const Failure = ({
  error,
}: CellFailureProps<FindFriendRequestQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

// ---------------------------- GraphQL Mutations -------------------------------

// Til að fela friend requestið ef einstaklingur ákveður að rejecta
export const UPDATE_FRIEND_REQUEST = gql`
  mutation UpdateFriendRequest($id: Int!, $input: UpdateFriendRequestInput!) {
    updateFriendRequest(id: $id, input: $input) {
      id
    }
  }
`

// Eyða friend request ef einstaklingur ákveður að accepta
// Þá myndast nýtt friendship
export const DELETE_FRIEND_REQUEST = gql`
  mutation DeleteFriendRequest($id: Int!) {
    deleteFriendRequest(id: $id) {
      id
      recieverId
      senderId
    }
  }
`

export const CREATE_FRIENDSHIP = gql`
  mutation CreateFriendShip($input: CreateFriendshipInput!) {
    createFriendship(input: $input) {
      id
      userId1
      userId2
    }
  }
`

// -------------------------------------------------------------------

export const Success = ({
  friendRequest,
}: CellSuccessProps<
  FindFriendRequestQuery,
  FindFriendRequestQueryVariables
>) => {
  const { currentUser } = useAuth()
  const refetchQueryObject = {
    refetchQueries: [FriendRequestsQuery, QUERY],
    variables: {
      userId: currentUser?.id,
      id: friendRequest?.id,
    },
  }
  const [updateFriendRequest] = useMutation(
    UPDATE_FRIEND_REQUEST,
    refetchQueryObject
  )
  const [createFriendship] = useMutation(CREATE_FRIENDSHIP, refetchQueryObject)
  const [deleteFriendRequest] = useMutation(
    DELETE_FRIEND_REQUEST,
    refetchQueryObject
  )
  const rejectRequest = async () => {
    // Fela requestið fyrir þeim sem fékk það sent
    const updateData = await updateFriendRequest({
      variables: {
        id: friendRequest.id,
        input: {
          hidden: true,
        },
      },
    })
    console.log(updateData)
  }
  const acceptRequest = async () => {
    // Eyða requestinu
    await deleteFriendRequest({ variables: { id: friendRequest.id } })
    // Búa til vinatengingu
    await createFriendship({
      variables: {
        input: {
          userId1: friendRequest.senderId,
          userId2: friendRequest.recieverId,
        },
      },
    })
    await createFriendship({
      variables: {
        input: {
          userId1: friendRequest.recieverId,
          userId2: friendRequest.senderId,
        },
      },
    })
  }
  useEffect(() => console.log(friendRequest))

  // Ekki birta reqestið ef það er falið
  if (friendRequest?.hidden) return <></>
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border bg-white p-2 sm:flex-row">
      <div className="mb-4 mr-4 sm:mb-0">
        <Link to={routes.profile({ id: friendRequest.senderId })}>
          <img
            src={friendRequest.sender.profilePic}
            className="h-10 w-10 rounded-full"
            alt=""
          />
        </Link>
      </div>
      <div className="flex-grow">
        <Link to={routes.profile({ id: friendRequest.senderId })}>
          <h4 className="text-lg font-semibold">{friendRequest.sender.name}</h4>
          <p className="text-gray-600">{`Sent you a friend request`}</p>
        </Link>
      </div>
      <div className="mt-4 flex gap-2 sm:mt-0">
        <button
          onClick={acceptRequest}
          className="mr-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Accept
        </button>
        <button
          onClick={rejectRequest}
          className="rounded-lg bg-slate-100 px-4 py-2 text-blue-500  hover:bg-slate-200"
        >
          Reject
        </button>
      </div>
    </div>
  )
}
