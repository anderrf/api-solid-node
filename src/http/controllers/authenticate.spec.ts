import app from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: '123321',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'anderson@test.com',
      password: '123321',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
