import { createApp } from './core'

const start = async () => {
  const app = await createApp()

  const { PORT: port } = app.config

  app.listen({ port }, (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

start()