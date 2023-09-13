import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms/:gymId/check-in', create)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.post('/check-ins/:checkInId/validate', validate)
}
