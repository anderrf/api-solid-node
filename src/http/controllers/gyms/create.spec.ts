import app from '@/app'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        latitude: -23.9332287,
        longitude: -46.3236995,
        phone: '13999999999',
        description: 'Learn JS while working out',
      })
    expect(response.statusCode).toEqual(201)
  })
})
