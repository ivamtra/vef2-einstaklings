// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

// -------------------- DATA -------------------------

// -------------------- USERS -------------------------

export const userData = [
  {
    id: 1,
    name: 'John Doe id 1',
    email: 'test1',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
    profilePic:
      'https://firebasestorage.googleapis.com/v0/b/new-facebook-ace12.appspot.com/o/images%2Fmstom_400x400.jpg?alt=media&token=76eaf10a-e563-427c-b812-e8ab217ba9f5',
  },
  {
    id: 2,
    name: 'Jane Smith id 2',
    email: 'test2',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 3,
    name: 'Michael Johnson id 3',
    email: 'test3',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 4,
    name: 'Emily Davis id 4',
    email: 'test4',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 5,
    name: 'David Martinez id 5',
    email: 'test5',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57',
  },
  {
    id: 6,
    name: 'Olivia Johnson id 6',
    email: 'test6',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 7,
    name: 'Daniel Wilson id 7',
    email: 'test7',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
]

// -------------------- Friend requests -------------------------

export const friendRequestData = [
  {
    recieverId: 2,
    senderId: 1,
  },
  {
    recieverId: 1,
    senderId: 5,
  },
  {
    recieverId: 1,
    senderId: 7,
  },
  {
    recieverId: 1,
    senderId: 6,
  },
  {
    recieverId: 3,
    senderId: 1,
  },
  {
    recieverId: 5,
    senderId: 2,
  },
]

// -------------------- POSTS -------------------------

export const postData = [
  {
    id: 1,
    userId: 1,
    body: 'These are some thougts that a person thought were relevant and decided to post for all his friends to see',
  },
  {
    id: 2,
    userId: 1,
    body: 'User id 1 post 2',
  },
  {
    id: 3,
    userId: 1,
    body: 'User id 1 post 3',
  },
  {
    id: 4,
    userId: 2,
    body: 'Feeling grateful for a beautiful day spent in nature with loved ones.',
  },
  {
    id: 5,
    userId: 3,
    body: 'Just finished an amazing book that I highly recommend to everyone!',
  },
  {
    id: 6,
    userId: 4,
    body: 'Excited to start a new project at work and see where it takes me!',
  },
  {
    id: 7,
    userId: 5,
    body: 'Missing my childhood friend and reminiscing about the good old days.',
  },
]

// -------------------- Friendships -------------------------

const friendshipData = [
  { id: 1, userId1: 1, userId2: 2 },
  { id: 2, userId1: 2, userId2: 1 },
  { id: 3, userId1: 3, userId2: 1 },
  { id: 4, userId1: 1, userId2: 3 },
]

// -------------------- LIKES -------------------------

const likeData = [
  { id: 1, userId: 1, postId: 2 },
  { id: 2, userId: 2, postId: 2 },
]

// ------------------------------------------------------

export default async () => {
  try {
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`

    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    // Promise.all(
    //   //
    //   // Change to match your data model and seeding needs
    //   //
    //   data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
    //     const record = await db.userExample.create({ data })
    //     console.log(record)
    //   })
    // )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //

    // Delete all records before adding

    console.log('deleting likes')
    await db.like.deleteMany()

    console.log('deleting friendships :(')
    await db.friendship.deleteMany()

    console.log('deleting friend requests...')
    await db.friendRequest.deleteMany()

    console.log('deleting posts...')

    await db.post.deleteMany()
    console.log('deleting users...')

    await db.user.deleteMany()

    console.log('Users deleted')

    for (const user of userData) {
      await db.user.create({ data: user })
      console.log('Created user', user)
    }

    for (const friendship of friendshipData) {
      await db.friendship.create({ data: friendship })
      console.log('Created friendship', friendship)
    }
    for (const post of postData) {
      await db.post.create({ data: post })
      console.log('Created post', post)
    }

    for (const friendRequest of friendRequestData) {
      await db.friendRequest.create({ data: friendRequest })
      console.log('Created friendRequest', friendRequest)
    }

    for (const like of likeData) {
      await db.like.create({ data: like })
      console.log('Created like', like)
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
