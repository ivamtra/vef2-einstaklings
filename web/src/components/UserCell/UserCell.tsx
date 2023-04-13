import { useEffect } from 'react'

import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useQuery,
  useMutation,
} from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import FriendListCell from '../FriendListCell'
import { DELETE_FRIEND_REQUEST } from '../FriendRequestCell'
import { CREATE_FRIENDSHIP } from '../FriendRequestCell'

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

export const FRIENDSHIP_BY_USER_IDS = gql`
  query FriendshipByUserIds($userId1: Int!, $userId2: Int!) {
    friendshipByUserIds(userId1: $userId1, userId2: $userId2) {
      id
    }
  }
`

export const CREATE_FRIEND_REQUEST = gql`
  mutation CreateFriendRequest($input: CreateFriendRequestInput!) {
    createFriendRequest(input: $input) {
      id
    }
  }
`
export const SENT_FRIEND_REQUEST = gql`
  query SentFriendRequest($recieverId: Int!, $senderId: Int!) {
    sentFriendRequest(recieverId: $recieverId, senderId: $senderId) {
      id
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
  const { currentUser } = useAuth()
  useEffect(() => console.log(checkFriendshipData))
  const { data: checkFriendshipData } = useQuery(FRIENDSHIP_BY_USER_IDS, {
    variables: {
      userId1: currentUser?.id,
      userId2: user.id,
    },
  })

  const { data: sentFriendRequest } = useQuery(SENT_FRIEND_REQUEST, {
    variables: {
      senderId: currentUser?.id,
      recieverId: user.id,
    },
  })
  const { data: recievedFriendRequest } = useQuery(SENT_FRIEND_REQUEST, {
    variables: {
      senderId: user.id,
      recieverId: currentUser?.id,
    },
  })

  const [createFriendship] = useMutation(CREATE_FRIENDSHIP, {
    refetchQueries: [SENT_FRIEND_REQUEST],
    variables: { senderId: currentUser?.id, recieverId: user.id },
  })
  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST)
  const hasSentFriendRequest = sentFriendRequest?.sentFriendRequest
  useEffect(() => console.log(hasSentFriendRequest))
  const sendFriendRequest = async () => {
    const recieverId = user.id
    const senderId = currentUser?.id

    // Athuga fyrst hvort að reciever er nú þegar búinn að senda friend request
    // Þá addast hann sjálfkrafa sem vinur
    if (recievedFriendRequest.sentFriendRequest) {
      // Eyða friend requesti frá viðkomandi user
      console.log(recievedFriendRequest)
      await deleteFriendRequest({
        variables: {
          id: recievedFriendRequest.sentFriendRequest.id,
        },
      })
      // Búa til friendship með user
      await createFriendship({
        variables: {
          input: { userId1: currentUser?.id, userId2: user.id },
        },
      })
      await createFriendship({
        variables: {
          input: { userId1: user.id, userId2: currentUser?.id },
        },
      })
      // Nennis að refetcha
      window.location.reload()
    } else {
      // Senda friend request
      try {
        const response = await createFriendRequest({
          variables: {
            input: {
              recieverId,
              senderId,
            },
          },
        })
        console.log(response)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const [createFriendRequest] = useMutation(CREATE_FRIEND_REQUEST, {
    refetchQueries: [SENT_FRIEND_REQUEST],
    variables: { senderId: currentUser?.id, recieverId: user.id },
  })

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="text-3xl font-bold text-gray-600">{user.name}</p>
      <img
        className="mx-auto mt-2 h-48 w-48 rounded-full"
        src={user.profilePic ? user.profilePic : 'https://picsum.photos/200'}
        alt=""
      />

      {/* TODO Setja logic í sér component */}

      {/* TODO:  Athuga hvort að búið er að senda request nú þegar */}
      {!checkFriendshipData?.friendshipByUserIds &&
      user.id !== currentUser?.id &&
      !hasSentFriendRequest ? (
        <div>
          <button
            onClick={sendFriendRequest}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Send friend request
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* TODO Setja logic í sér component */}

      {/* List of friends */}

      <FriendListCell userId={user.id} />
    </div>
  )
}
