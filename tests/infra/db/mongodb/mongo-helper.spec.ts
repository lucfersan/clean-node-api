import { MongoHelper as sut } from '@/infra/db'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('should reconnect if mongodb client is down ', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
