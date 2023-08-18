import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    await usersRepository.create({
      name: 'Anderson',
      email: 'anderson@test.com',
      password_hash: await hash('123', 6),
    })
    const { user } = await sut.execute({
      email: 'anderson@test.com',
      password: '123',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    await usersRepository.create({
      name: 'Anderson',
      email: 'anderson@test.com',
      password_hash: await hash('123', 6),
    })
    await expect(() =>
      sut.execute({ email: 'anderson.rocha@testing.mail', password: '123' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)
    await usersRepository.create({
      name: 'Anderson',
      email: 'anderson@test.com',
      password_hash: await hash('123', 6),
    })
    await expect(() =>
      sut.execute({ email: 'anderson@test.com', password: '321' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
