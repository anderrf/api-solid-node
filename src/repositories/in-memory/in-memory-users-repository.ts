import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      ...data,
      id: data.id ? data.id : randomUUID(),
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
    }
    this.items.push(user)
    return user
  }
}
