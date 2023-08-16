import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}

export class RegisterUseCase{

    constructor(
        private usersRepository: UsersRepository
    ){}

    async execute({name, email, password}: RegisterUseCaseRequest){
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
        await this.usersRepository.create({name, email, password_hash: await hash(password, 6)})
    }
    
}