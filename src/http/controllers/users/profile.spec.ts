import app from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: '123321',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'anderson@test.com',
      password: '123321',
    })
    const { token } = authResponse.body
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'anderson@test.com',
      }),
    )
  })
})
