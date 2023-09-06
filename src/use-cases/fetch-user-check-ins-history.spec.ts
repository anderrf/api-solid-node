import { describe, it, expect, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

describe('Fetch User Check-in History Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: FetchUserCheckInsHistoryUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
    checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })
    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i: number = 0; i < 22; i++) {
      checkInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i + 1}`,
      })
    }
    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
