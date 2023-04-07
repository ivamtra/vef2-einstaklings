// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

// -------------------- DATA -------------------------

// -------------------- USERS -------------------------

export const userData = [
  {
    id: 1,
    email: 'Placeholder',
    hashedPassword: 'Placeholder',
    salt: 'salt',
  },
  {
    id: 2,
    email: 'ivan',
    hashedPassword:
      'f01d1e7dc3eff50d1addc98cd59197d9b65833495704f8083a8eb3994630f41e',
    salt: 'b8c776ee8e770532d01c1a913bf69553',
  },
  {
    id: 3,
    email: 'test',
    hashedPassword: 'asdasdjkasdffasdjk',
    salt: 'ASDA',
  },
  {
    id: 4,
    email: 'admin',
    hashedPassword:
      'd0837ca0bdadc1d10c793292a5440b840a4cfbaf6e37da0c675f2fc9a2497107',
    salt: '20673fcd6c9c813ee3a037da0809fb3f',
  },
  {
    id: 5,
    email: 'moderator',
    hashedPassword:
      '653b6a461d86c070381dc773bc8dc5e9c14108b5267fbec0ec7615a94f7c29a0',
    salt: 'db4cca0d8840b936efc83189d3569410',
  },
  {
    id: 6,
    email: 'test1',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 7,
    email: 'test2',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 8,
    email: 'test3',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 9,
    email: 'test4',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    id: 10,
    email: 'test5',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57',
  },
  {
    id: 11,
    email: 'test6',
    hashedPassword:
      '8cb597d670a029923c30af8388d23f52750ede8c5926079647421f281f9f7e0f',
    salt: 'e57cdaee6b0d0b57ae0b157c6cbb7f96',
  },
  {
    email: 'test7',
    id: 12,
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
    userId: 1,
    body: 'These are some thougts that a person thought were relevant and decided to post for all his friends to see',
  },
  {
    userId: 2,
    body: 'Feeling grateful for a beautiful day spent in nature with loved ones.',
  },
  {
    userId: 3,
    body: 'Just finished an amazing book that I highly recommend to everyone!',
  },
  {
    userId: 4,
    body: 'Excited to start a new project at work and see where it takes me!',
  },
  {
    userId: 5,
    body: 'Missing my childhood friend and reminiscing about the good old days.',
  },
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

    for (const post of postData) {
      await db.post.create({ data: post })
    }

    for (const friendRequest of friendRequestData) {
      await db.friendRequest.create({ data: friendRequest })
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
