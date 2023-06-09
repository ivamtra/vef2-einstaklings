export const schema = gql`
  type Comment {
    id: Int!
    user: User!
    userId: Int!
    post: Post!
    postId: Int!
    body: String!
    createdAt: DateTime!
  }

  type Query {
    comments: [Comment!]! @requireAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    userId: Int!
    postId: Int!
    body: String!
  }

  input UpdateCommentInput {
    userId: Int
    postId: Int
    body: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
