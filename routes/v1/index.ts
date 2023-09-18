import { z } from 'zod'
import { defineRoute } from '~/core'

export default defineRoute(async (app) => {
  app.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: z.string(),
      },
    },
    handler: () => {
      return 'OK!'
    },
  })
})