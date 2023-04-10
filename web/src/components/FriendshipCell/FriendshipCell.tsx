import type {
  FindFriendshipQuery,
  FindFriendshipQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindFriendshipQuery($id: Int!) {
    friendship: friendship(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindFriendshipQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  friendship,
}: CellSuccessProps<FindFriendshipQuery, FindFriendshipQueryVariables>) => {
  return <div>{JSON.stringify(friendship)}</div>
}
