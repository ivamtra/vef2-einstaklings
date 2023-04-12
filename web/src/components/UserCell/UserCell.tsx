import { useEffect } from 'react'

import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useQuery,
  useMutation,
} from '@redwoodjs/web'

import { useAuth } from 'src/auth'

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
  // TODO error höndlun
  const {
    loading,
    data: friendsData,
    error,
  } = useQuery(friendsQuery, {
    variables: { userId: user.id },
  })
  const { currentUser } = useAuth()
  useEffect(() => console.log(checkFriendshipData))
  const { data: checkFriendshipData } = useQuery(FRIENDSHIP_BY_USER_IDS, {
    variables: {
      userId1: currentUser?.id,
      userId2: user.id,
    },
  })

  const sendFriendRequest = async () => {
    const recieverId = user.id
    const senderId = currentUser?.id
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

  const [createFriendRequest] = useMutation(CREATE_FRIEND_REQUEST)

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
      user.id !== currentUser?.id ? (
        <div>
          <button
            onClick={sendFriendRequest}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Send friend request
          </button>
        </div>
      ) : (
        <>
          <h1>Poop</h1>
        </>
      )}

      {/* TODO Setja logic í sér component */}

      <h4 className="mt-8 text-xl font-semibold text-gray-600">Friends</h4>
      {/* TODO Setja i component */}
      {/* List of friends */}
      {friendsData?.friends?.map((friend) => {
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
