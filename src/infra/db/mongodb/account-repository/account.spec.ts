import { MongoHelper } from '../helpers/mongo'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an account on success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('John Doe')
    expect(account.email).toBe('johndoe@example.com')
    expect(account.password).toBe('123456')
  })
})
