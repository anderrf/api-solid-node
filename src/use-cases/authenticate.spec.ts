import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
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
