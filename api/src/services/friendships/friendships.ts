import type {
  QueryResolvers,
  MutationResolvers,
  FriendshipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const friendships: QueryResolvers['friendships'] = () => {
  return db.friendship.findMany()
}

export const friendshipsByUser: QueryResolvers['friendships'] = ({
  userId,
}: any) => {
  return db.friendship.findMany({
    where: {
      userId1: userId,
    },
  })
}

export const friendship: QueryResolvers['friendship'] = ({ id }) => {
  return db.friendship.findUnique({
    where: { id },
  })
}

export const createFriendship: MutationResolvers['createFriendship'] = ({
  input,
}) => {
  return db.friendship.create({
    data: input,
  })
}

export const updateFriendship: MutationResolvers['updateFriendship'] = ({
  id,
  input,
}) => {
  return db.friendship.update({
    data: input,
    where: { id },
  })
}

export const deleteFriendship: MutationResolvers['deleteFriendship'] = ({
  id,
}) => {
  return db.friendship.delete({
    where: { id },
  })
}

export const Friendship: FriendshipRelationResolvers = {
  user: (_obj, { root }) => {
    return db.friendship.findUnique({ where: { id: root?.id } }).user()
  },
}
