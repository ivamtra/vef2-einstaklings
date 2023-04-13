import { useEffect } from 'react'

import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { QUERY as PostQuery } from '../PostCell'

export const GET_LIKE = gql`
  query GetLike($userId: Int!, $postId: Int!) {
    getLike(userId: $userId, postId: $postId) {
      id
    }
  }
`

export const CREATE_LIKE = gql`
  mutation CreateLike($input: CreateLikeInput!) {
    createLike(input: $input) {
      id
    }
  }
`

export const DELETE_LIKE = gql`
  mutation DeleteLike($id: Int!) {
    deleteLike(id: $id) {
      id
    }
  }
`

const LikeButton = ({ postId }: any) => {
  const { currentUser } = useAuth()
  const { data } = useQuery(GET_LIKE, {
    variables: { postId, userId: currentUser?.id },
  })
  const [createLike] = useMutation(CREATE_LIKE, {
    refetchQueries: [GET_LIKE, PostQuery],
    variables: {
      userId: currentUser?.id,
      postId,
      id: postId,
    },
  })
  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries: [GET_LIKE, PostQuery],
    variables: {
      userId: currentUser?.id,
      postId,
      id: postId,
    },
  })
  useEffect(() => {
    console.log('Likebutton', data)
  })

  const like = async () => {
    await createLike({
      variables: {
        input: {
          userId: currentUser?.id,
          postId,
        },
      },
    })
  }
  const unLike = async () => {
    await deleteLike({ variables: { id: data?.getLike?.id } })
  }
  return (
    <div>
      {data?.getLike ? (
        <button onClick={unLike}>
          <AiFillLike className=" h-6 w-6 rounded-lg text-blue-500 hover:bg-slate-100" />
        </button>
      ) : (
        <button onClick={like}>
          <AiOutlineLike className=" h-6 w-6 rounded-lg hover:bg-slate-100" />
        </button>
      )}
    </div>
  )
}

export default LikeButton
