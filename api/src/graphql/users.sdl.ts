export const schema = gql`
  type User {
    id: Int!
    name: String
    profilePic: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    friends: [Friendship]!
    posts: [Post]!
    comments: [Comment]!
    sentFriendRequests: [FriendRequest]!
    recievedFriendRequests: [FriendRequest]!
    messagesSent: [Message]!
    messagesRecieved: [Message]!
  }

  type Query {
    users: [User!]! @requireAuth
    friends(userId: Int!): [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    profilePic: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    profilePic: String
    name: String
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
