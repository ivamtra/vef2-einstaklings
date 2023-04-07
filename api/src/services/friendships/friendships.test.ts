import type { Friendship } from '@prisma/client'

import {
  friendships,
  friendship,
  createFriendship,
  updateFriendship,
  deleteFriendship,
} from './friendships'
import type { StandardScenario } from './friendships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('friendships', () => {
  scenario('returns all friendships', async (scenario: StandardScenario) => {
    const result = await friendships()

    expect(result.length).toEqual(Object.keys(scenario.friendship).length)
  })

  scenario(
    'returns a single friendship',
    async (scenario: StandardScenario) => {
      const result = await friendship({ id: scenario.friendship.one.id })

      expect(result).toEqual(scenario.friendship.one)
    }
  )

  scenario('creates a friendship', async (scenario: StandardScenario) => {
    const result = await createFriendship({
      input: { userId1: scenario.friendship.two.userId1, userId2: 8822548 },
    })

    expect(result.userId1).toEqual(scenario.friendship.two.userId1)
    expect(result.userId2).toEqual(8822548)
  })

  scenario('updates a friendship', async (scenario: StandardScenario) => {
    const original = (await friendship({
      id: scenario.friendship.one.id,
    })) as Friendship
    const result = await updateFriendship({
      id: original.id,
      input: { userId2: 2268043 },
    })

    expect(result.userId2).toEqual(2268043)
  })

  scenario('deletes a friendship', async (scenario: StandardScenario) => {
    const original = (await deleteFriendship({
      id: scenario.friendship.one.id,
    })) as Friendship
    const result = await friendship({ id: original.id })

    expect(result).toEqual(null)
  })
})
