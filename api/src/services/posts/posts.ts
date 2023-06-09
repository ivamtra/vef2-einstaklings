import type {
  QueryResolvers,
  MutationResolvers,
  PostRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const postsByFriends: QueryResolvers['posts'] = ({ userId }: any) => {
  // Passar að það se current user áður en query-að
  if (context.currentUser.id !== userId) return []

  return db.$queryRaw`SELECT * FROM "Post" WHERE "userId" in (SELECT "userId2" from "Friendship" where "userId1" = ${userId}) or "userId" = ${userId} ORDER BY "createdAt" DESC`
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
    include: {
      Like: true,
    },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: input,
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post: PostRelationResolvers = {
  user: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root?.id } }).user()
  },
  Comment: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root?.id } }).Comment()
  },
}
