import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

import configDocs from '@/main/docs'
import { noCache } from '@/main/middlewares'

export default function setupSwagger(app: Express): void {
  app.use('/api-docs', noCache, serve, setup(configDocs))
}
