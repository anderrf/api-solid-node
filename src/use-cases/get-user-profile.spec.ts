import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { AuthenticateUseCase } from './authenticate'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get User Profile Use case', () => {
  let usersRepository: InMemoryUsersRepository
  let authenticateUseCase: AuthenticateUseCase
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    await usersRepository.create({
      name: 'Anderson',
      email: 'anderson@test.com',
      password_hash: await hash('123', 6),
    })
    const authenticatedUser = await authenticateUseCase.execute({
      email: 'anderson@test.com',
      password: '123',
    })
    const userProfile = await sut.execute({
      userId: authenticatedUser.user.id,
    })
    expect(userProfile.user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with non-existent user id', async () => {
    await usersRepository.create({
      name: 'Anderson',
      email: 'anderson@test.com',
      password_hash: await hash('123', 6),
    })
    await authenticateUseCase.execute({
      email: 'anderson@test.com',
      password: '123',
    })
    await expect(() =>
      sut.execute({
        userId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
