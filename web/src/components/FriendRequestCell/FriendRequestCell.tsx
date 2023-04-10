import type {
  FindFriendRequestQuery,
  FindFriendRequestQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindFriendRequestQuery($id: Int!) {
    friendRequest: friendRequest(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindFriendRequestQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  friendRequest,
}: CellSuccessProps<
  FindFriendRequestQuery,
  FindFriendRequestQueryVariables
>) => {
  return <div>{JSON.stringify(friendRequest)}</div>
}
