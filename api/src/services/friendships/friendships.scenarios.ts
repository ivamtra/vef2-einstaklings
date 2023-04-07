import type { Prisma, Friendship } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FriendshipCreateArgs>({
  friendship: {
    one: {
      data: {
        userId2: 7706837,
        user: {
          create: {
            email: 'String5645597',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        userId2: 969307,
        user: {
          create: {
            email: 'String8192302',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Friendship, 'friendship'>
