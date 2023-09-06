import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInsRepository } from './../repositories/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

describe('Check-in Use Case', () => {
  let checkInsRepository: CheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    gymsRepository.items.push(
      ...[
        {
          id: 'gym-01',
          title: 'JS Gym',
          latitude: new Decimal(-23.9332287),
          longitude: new Decimal(-46.3236995),
          description: null,
          phone: null,
        },
        {
          id: 'gym-02',
          title: 'TS Gym',
          latitude: new Decimal(-13.9332287),
          longitude: new Decimal(-26.3236995),
          description: null,
          phone: null,
        },
      ],
    )
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.9332287,
      userLongitude: -46.3236995,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.9332287,
        userLongitude: -46.3236995,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.9332287,
      userLongitude: -46.3236995,
    })
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.9332287,
      userLongitude: -46.3236995,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.9332287,
        userLongitude: -46.3236995,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
