export const schema = gql`
  type FriendRequest {
    id: Int!
    createdAt: DateTime!
    sender: User!
    senderId: Int!
    reciever: User!
    recieverId: Int!
  }

  type Query {
    friendRequests: [FriendRequest!]! @requireAuth
    friendRequest(id: Int!): FriendRequest @requireAuth
  }

  input CreateFriendRequestInput {
    senderId: Int!
    recieverId: Int!
  }

  input UpdateFriendRequestInput {
    senderId: Int
    recieverId: Int
  }

  type Mutation {
    createFriendRequest(input: CreateFriendRequestInput!): FriendRequest!
      @requireAuth
    updateFriendRequest(
      id: Int!
      input: UpdateFriendRequestInput!
    ): FriendRequest! @requireAuth
    deleteFriendRequest(id: Int!): FriendRequest! @requireAuth
  }
`
