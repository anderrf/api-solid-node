import { afterAll, beforeAll, expect, it, describe } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Register (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: '123321',
    })
    expect(response.statusCode).toEqual(201)
  })
})
