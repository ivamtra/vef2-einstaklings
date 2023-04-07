export const schema = gql`
  type Message {
    id: Int!
    message: String!
    recieverId: Int!
    senderId: Int!
    createdAt: DateTime!
    reciever: User!
    sender: User!
  }

  type Query {
    messages: [Message!]! @requireAuth
    message(id: Int!): Message @requireAuth
  }

  input CreateMessageInput {
    message: String!
    recieverId: Int!
    senderId: Int!
  }

  input UpdateMessageInput {
    message: String
    recieverId: Int
    senderId: Int
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message! @requireAuth
    updateMessage(id: Int!, input: UpdateMessageInput!): Message! @requireAuth
    deleteMessage(id: Int!): Message! @requireAuth
  }
`
