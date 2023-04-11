import type { FindPostQuery, FindPostQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindPostQuery($id: Int!) {
    post: post(id: $id) {
      id
      body
      user {
        id
        email
        profilePic
        name
      }
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPostQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  post,
}: CellSuccessProps<FindPostQuery, FindPostQueryVariables>) => {
  return (
    <div className="flex flex-col rounded bg-white p-4 shadow-md">
      <Link to={routes.profile({ id: post.user.id })}>
        <div className="text-md mb-2 flex gap-x-2">
          <img
            src={post.user.profilePic}
            className="w-[30px] rounded-xl"
            alt=""
          />
          <p className="">{post.user.name}</p>
        </div>
      </Link>

      <p className="text-gray-800">{post.body}</p>

      <p className="mt-2 text-gray-600">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  )
}
