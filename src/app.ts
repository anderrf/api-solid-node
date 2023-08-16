import fastify from 'fastify'

const app = fastify();
app.get('/check-in', (request, reply) => {
    return reply.status(200).send({'message': 'Check-in was registered'})
})
export default app
