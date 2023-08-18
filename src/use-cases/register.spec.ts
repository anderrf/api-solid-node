import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upor registration', async () => {
    const { user } = await sut.execute({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: 'zxdfty',
    })
    const isPasswordCorrectlyHashed = await compare(
      'zxdfty',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'anderson@test.com'
    await sut.execute({
      name: 'Anderson Farias',
      email,
      password: 'zxdfty',
    })
    expect(() =>
      sut.execute({
        name: 'Anderson Farias',
        email,
        password: 'zxdfty',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: 'zxdfty',
    })
    await expect(user.id).toEqual(expect.any(String))
  })
})
