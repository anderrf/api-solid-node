import app from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import request from 'supertest'

describe('Validate check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -23.9332287,
        longitude: -46.3236995,
        phone: '13999999999',
        description: 'Learn JS while working out',
      },
    })
    const user = await prisma.user.findFirstOrThrow()
    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(204)
    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
