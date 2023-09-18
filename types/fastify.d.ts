import type { FastifyInstance } from 'fastify'
import type { Config } from './config'

declare module 'fastify' {
  interface FastifyInstance {
    config: Config
  }
}