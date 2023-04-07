import type { Prisma, Comment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        user: {
          create: {
            email: 'String7151054',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String3600793',
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
        body: 'String',
        user: {
          create: {
            email: 'String325967',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String8890038',
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

export type StandardScenario = ScenarioData<Comment, 'comment'>
