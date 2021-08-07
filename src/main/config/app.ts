import express from 'express'

import setupApolloServer from './apollo-server'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './swagger'

const app = express()

async function main(): Promise<void> {
  await setupApolloServer(app)
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
}

main().catch(console.error)

export default app
