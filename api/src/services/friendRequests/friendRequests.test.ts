import type { FriendRequest } from '@prisma/client'

import {
  friendRequests,
  friendRequest,
  createFriendRequest,
  updateFriendRequest,
  deleteFriendRequest,
} from './friendRequests'
import type { StandardScenario } from './friendRequests.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('friendRequests', () => {
  scenario('returns all friendRequests', async (scenario: StandardScenario) => {
    const result = await friendRequests()

    expect(result.length).toEqual(Object.keys(scenario.friendRequest).length)
  })

  scenario(
    'returns a single friendRequest',
    async (scenario: StandardScenario) => {
      const result = await friendRequest({ id: scenario.friendRequest.one.id })

      expect(result).toEqual(scenario.friendRequest.one)
    }
  )

  scenario('creates a friendRequest', async (scenario: StandardScenario) => {
    const result = await createFriendRequest({
      input: {
        senderId: scenario.friendRequest.two.senderId,
        recieverId: scenario.friendRequest.two.recieverId,
      },
    })

    expect(result.senderId).toEqual(scenario.friendRequest.two.senderId)
    expect(result.recieverId).toEqual(scenario.friendRequest.two.recieverId)
  })

  scenario('updates a friendRequest', async (scenario: StandardScenario) => {
    const original = (await friendRequest({
      id: scenario.friendRequest.one.id,
    })) as FriendRequest
    const result = await updateFriendRequest({
      id: original.id,
      input: { senderId: scenario.friendRequest.two.senderId },
    })

    expect(result.senderId).toEqual(scenario.friendRequest.two.senderId)
  })

  scenario('deletes a friendRequest', async (scenario: StandardScenario) => {
    const original = (await deleteFriendRequest({
      id: scenario.friendRequest.one.id,
    })) as FriendRequest
    const result = await friendRequest({ id: original.id })

    expect(result).toEqual(null)
  })
})
