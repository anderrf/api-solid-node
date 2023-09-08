import { ValidateCheckInUseCase } from '../validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)
  return validateCheckInUseCase
}
