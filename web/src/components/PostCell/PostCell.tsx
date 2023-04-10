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
    <div className="rounded bg-white p-4 shadow-md">
      <Link to={routes.post({ id: post.id })}>Link</Link>
      <p>Post id {post.id}</p>
      <p className="text-gray-800">{post.body}</p>
      <Link to={routes.profile({ id: post.user.id })}>
        <p className="mt-2 text-gray-600">{post.user.email}</p>
      </Link>

      <p className="mt-2 text-gray-600">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
