import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo'
import { LogMongoRepository } from './log'

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
    const sut = new LogMongoRepository()
    await sut.logError('any_error')

    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
