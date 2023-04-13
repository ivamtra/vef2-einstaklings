import type {
  QueryResolvers,
  MutationResolvers,
  LikeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const likes: QueryResolvers['likes'] = () => {
  return db.like.findMany()
}

export const like: QueryResolvers['like'] = ({ id }) => {
  return db.like.findUnique({
    where: { id },
  })
}

export const getLike: QueryResolvers['like'] = ({ userId, postId }: any) => {
  return db.like.findFirst({ where: { AND: [{ postId }, { userId }] } })
}

export const createLike: MutationResolvers['createLike'] = ({ input }) => {
  return db.like.create({
    data: input,
  })
}

export const updateLike: MutationResolvers['updateLike'] = ({ id, input }) => {
  return db.like.update({
    data: input,
    where: { id },
  })
}

export const deleteLike: MutationResolvers['deleteLike'] = ({ id }) => {
  return db.like.delete({
    where: { id },
  })
}

export const Like: LikeRelationResolvers = {
  user: (_obj, { root }) => {
    return db.like.findUnique({ where: { id: root?.id } }).user()
  },
  post: (_obj, { root }) => {
    return db.like.findUnique({ where: { id: root?.id } }).post()
  },
}
