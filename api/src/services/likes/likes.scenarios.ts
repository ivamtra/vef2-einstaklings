import type { Prisma, Like } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LikeCreateArgs>({
  like: {
    one: {
      data: {
        user: {
          create: {
            email: 'String3534940',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String521310',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String5338603',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String411938',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Like, 'like'>
