export const schema = gql`
  type Post {
    id: Int!
    userId: Int!
    body: String!
    user: User!
    createdAt: DateTime!
    Comment: [Comment]!
    Like: [Like]!
  }

  type Query {
    posts: [Post!]! @requireAuth
    postsByFriends(userId: Int!): [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    userId: Int!
    body: String!
  }

  input UpdatePostInput {
    userId: Int
    body: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
