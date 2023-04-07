import type { Prisma, Message } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MessageCreateArgs>({
  message: {
    one: {
      data: {
        message: 'String',
        reciever: {
          create: {
            email: 'String3632915',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        sender: {
          create: {
            email: 'String5126169',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        message: 'String',
        reciever: {
          create: {
            email: 'String7519904',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        sender: {
          create: {
            email: 'String4125197',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Message, 'message'>
