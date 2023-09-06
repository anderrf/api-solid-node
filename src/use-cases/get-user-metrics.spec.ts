import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

describe('get user metrics', () => {
  let checkInsRepository: CheckInsRepository
  let sut: GetUserMetricsUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
    checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })
    const { checkInsCount } = await sut.execute({ userId: 'user-01' })
    expect(checkInsCount).toEqual(2)
  })
})
