import { GymsRepository } from '@/repositories/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Fetch nearby gyms use case', () => {
  let gymsRepository: GymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -23.9332287,
      longitude: -46.3236995,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -3.9332287,
      longitude: -26.3236995,
    })
    const { gyms } = await sut.execute({
      userLatitude: -23.9332287,
      userLongitude: -46.3236995,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.objectContaining([expect.objectContaining({ title: 'Near Gym' })]),
    )
  })
})
