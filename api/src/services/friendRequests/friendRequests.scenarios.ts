import type { Prisma, FriendRequest } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FriendRequestCreateArgs>({
  friendRequest: {
    one: {
      data: {
        sender: {
          create: {
            email: 'String5937252',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        reciever: {
          create: {
            email: 'String9857889',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        sender: {
          create: {
            email: 'String4559027',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        reciever: {
          create: {
            email: 'String2711866',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<FriendRequest, 'friendRequest'>
