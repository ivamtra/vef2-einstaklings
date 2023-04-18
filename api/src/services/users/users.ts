import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const friends: QueryResolvers['users'] = ({ userId }: any) => {
  return db.$queryRaw`SELECT * FROM "User" WHERE "id" in (select "userId2" from "Friendship" where "userId1" = ${userId})`
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  friends: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).friends()
  },
  posts: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).posts()
  },
  comments: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).comments()
  },
  sentFriendRequests: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).sentFriendRequests()
  },
  recievedFriendRequests: (_obj, { root }) => {
    return db.user
      .findUnique({ where: { id: root?.id } })
      .recievedFriendRequests()
  },
  messagesSent: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).messagesSent()
  },
  messagesRecieved: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).messagesRecieved()
  },
}
