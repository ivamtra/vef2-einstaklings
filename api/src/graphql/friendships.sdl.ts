export const schema = gql`
  type Friendship {
    id: Int!
    userId1: Int!
    userId2: Int!
    createdAt: DateTime!
    user: User!
  }

  type Query {
    friendshipsByUser(userId: Int!): [Friendship!]! @requireAuth
    friendships: [Friendship!]! @requireAuth
    friendship(id: Int!): Friendship @requireAuth
  }

  input CreateFriendshipInput {
    userId1: Int!
    userId2: Int!
  }

  input UpdateFriendshipInput {
    userId1: Int
    userId2: Int
  }

  type Mutation {
    createFriendship(input: CreateFriendshipInput!): Friendship! @requireAuth
    updateFriendship(id: Int!, input: UpdateFriendshipInput!): Friendship!
      @requireAuth
    deleteFriendship(id: Int!): Friendship! @requireAuth
  }
`
