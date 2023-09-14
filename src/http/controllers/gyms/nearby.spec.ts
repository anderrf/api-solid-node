import app from '@/app'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('fetch nearby gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        latitude: -23.9332287,
        longitude: -46.3236995,
        phone: '13999999999',
        description: 'Learn JS while working out',
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        latitude: -13.9332287,
        longitude: -36.3236995,
        phone: '11999999999',
        description: 'Learn TS while working out',
      })
    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.9332287,
        longitude: -46.3236995,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
