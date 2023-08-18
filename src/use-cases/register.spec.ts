import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register Use Case', () => {
  it('should hash user password upor registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)
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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)
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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)
    const { user } = await sut.execute({
      name: 'Anderson Farias',
      email: 'anderson@test.com',
      password: 'zxdfty',
    })
    await expect(user.id).toEqual(expect.any(String))
  })
})
