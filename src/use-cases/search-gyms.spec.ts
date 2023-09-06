import { GymsRepository } from '@/repositories/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('search gyms use case', () => {
  let gymsRepository: GymsRepository
  let sut: SearchGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JS Gym',
      latitude: -23.9332287,
      longitude: -46.3236995,
    })
    await gymsRepository.create({
      id: 'gym-02',
      title: 'TS Gym',
      latitude: -13.9332287,
      longitude: -26.3236995,
    })
    const { gyms } = await sut.execute({ query: 'TS', page: 1 })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ id: 'gym-02' })])
  })

  it('should be able to search for paginated gyms in multiple pages', async () => {
    for (let i: number = 0; i < 22; i++) {
      await gymsRepository.create({
        title: `TS Gym ${i + 1}`,
        latitude: -13.9332287,
        longitude: -26.3236995,
      })
    }
    const { gyms } = await sut.execute({ query: 'TS', page: 2 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TS Gym 21' }),
      expect.objectContaining({ title: 'TS Gym 22' }),
    ])
  })
})
