import type {
  QueryResolvers,
  MutationResolvers,
  FriendRequestRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const friendRequests: QueryResolvers['friendRequests'] = () => {
  return db.friendRequest.findMany()
}

export const recievingFriendRequests: QueryResolvers['friendRequests'] = ({
  userId,
}: any) => {
  return db.friendRequest.findMany({
    where: {
      recieverId: userId,
    },
  })
}

export const sentFriendRequest: QueryResolvers['friendRequest'] = ({
  recieverId,
  senderId,
}: any) => {
  return db.friendRequest.findFirst({
    where: {
      AND: [{ senderId }, { recieverId }],
    },
  })
}

export const sentFriendRequests: QueryResolvers['friendRequests'] = ({
  userId,
}: any) => {
  return db.friendRequest.findMany({
    where: {
      senderId: userId,
    },
  })
}

export const friendRequest: QueryResolvers['friendRequest'] = ({ id }) => {
  return db.friendRequest.findUnique({
    where: { id },
  })
}

export const createFriendRequest: MutationResolvers['createFriendRequest'] = ({
  input,
}) => {
  return db.friendRequest.create({
    data: input,
  })
}

export const updateFriendRequest: MutationResolvers['updateFriendRequest'] = ({
  id,
  input,
}) => {
  return db.friendRequest.update({
    data: input,
    where: { id },
  })
}

export const deleteFriendRequest: MutationResolvers['deleteFriendRequest'] = ({
  id,
}) => {
  return db.friendRequest.delete({
    where: { id },
  })
}

export const FriendRequest: FriendRequestRelationResolvers = {
  sender: (_obj, { root }) => {
    return db.friendRequest.findUnique({ where: { id: root?.id } }).sender()
  },
  reciever: (_obj, { root }) => {
    return db.friendRequest.findUnique({ where: { id: root?.id } }).reciever()
  },
}
