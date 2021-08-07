import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export default function setupRoutes(app: Express): void {
  const router = Router()
  app.use('/api', router)
  readdirSync(resolve(__dirname, '../routes')).map(async file => {
    if (!file.endsWith('.map')) {
      const route = await import(resolve(__dirname, '../routes', file))
      route.default(router)
    }
  })
}
