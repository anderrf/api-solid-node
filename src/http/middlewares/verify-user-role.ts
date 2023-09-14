import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'ROLE') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
