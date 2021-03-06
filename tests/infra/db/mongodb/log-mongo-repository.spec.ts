import faker from 'faker'
import { Collection } from 'mongodb'

import { MongoHelper, LogMongoRepository } from '@/infra/db'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())

    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
