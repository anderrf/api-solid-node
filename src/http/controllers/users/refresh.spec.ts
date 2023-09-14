import app from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: '123321',
    })
    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'anderson@test.com', password: '123321' })
    const cookies = authResponse.get('Set-Cookie')
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
