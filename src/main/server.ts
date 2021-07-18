import './config/module-alias'

import { MongoHelper } from '@/infra/db'

import app from './config/app'
import env from './config/env'

const main = async (): Promise<void> => {
  await MongoHelper.connect(env.mongoUrl)
  console.log('Connect to database successfully 📦')

  app.listen(env.port, () =>
    console.log(`Server running at port ${env.port} 🔥`)
  )
}

main().catch(console.error)
