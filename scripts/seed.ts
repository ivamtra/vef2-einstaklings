import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // const data: Prisma.UserExampleCreateArgs['data'][] = [
    // To try this example data with the UserExample model in schema.prisma,
    // uncomment the lines below and run 'yarn rw prisma migrate dev'
    //
    // { name: 'alice', email: 'alice@example.com' },
    // { name: 'mark', email: 'mark@example.com' },
    // { name: 'jackie', email: 'jackie@example.com' },
    // { name: 'bob', email: 'bob@example.com' },
    // ]

    const userData = [
      {
        email: 'Placeholder',
        hashedPassword: 'Placeholder',
        salt: 'salt',
      },
      {
        email: 'ivan',
        hashedPassword:
          'f01d1e7dc3eff50d1addc98cd59197d9b65833495704f8083a8eb3994630f41e',
        salt: 'b8c776ee8e770532d01c1a913bf69553',
      },
      {
        email: 'test',
        hashedPassword: 'asdasdjkasdffasdjk',
        salt: 'ASDA',
      },
      {
        email: 'admin',
        hashedPassword:
          'd0837ca0bdadc1d10c793292a5440b840a4cfbaf6e37da0c675f2fc9a2497107',
        salt: '20673fcd6c9c813ee3a037da0809fb3f',
      },
      {
        email: 'moderator',
        hashedPassword:
          '653b6a461d86c070381dc773bc8dc5e9c14108b5267fbec0ec7615a94f7c29a0',
        salt: 'db4cca0d8840b936efc83189d3569410',
      },
    ]
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
    for (const user of userData) {
      await db.user.create({ data: user })
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
