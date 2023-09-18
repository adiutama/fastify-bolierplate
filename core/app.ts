import Fastify from 'fastify'
import FastifyEnv from '@fastify/env'
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui'
import FastifyAutoload from '@fastify/autoload'
import path from 'path'

import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { configSchema } from './config'

export type AppInstance = Awaited<ReturnType<typeof createApp>>

export const createApp = async () => {
  const app = Fastify({
    ignoreTrailingSlash: true,
    logger: true,
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await app.register(FastifyEnv, {
    dotenv: true,
    confKey: 'config',
    schema: configSchema,
  })

  await app.register(FastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  })

  await app.register(FastifySwaggerUI, {
    routePrefix: '/docs',
  })

  await app.register(FastifyAutoload, {
    dir: path.join(__dirname, '../routes'),
  })

  return app
}
