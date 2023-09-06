import { GymsRepository } from '@/repositories/gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Create gym Use case', () => {
  let gymsRepository: GymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      latitude: -23.9332287,
      longitude: -46.3236995,
      description: null,
      phone: null,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
