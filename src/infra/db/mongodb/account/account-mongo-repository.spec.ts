import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection
describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    it('should return an account add on success', async () => {
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

  describe('loadByEmail()', () => {
    it('should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
      const account = await sut.loadByEmail('johndoe@example.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('John Doe')
      expect(account.email).toBe('johndoe@example.com')
      expect(account.password).toBe('123456')
    })

    it('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('johndoe@example.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('should update an account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
      const fakeAccount = result.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    it('should return an account on loadByToken success without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('John Doe')
      expect(account.email).toBe('johndoe@example.com')
      expect(account.password).toBe('123456')
    })

    it('should return an account on loadByToken success with role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        accessToken: 'any_token',
        role: 'any_role'
      })
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('John Doe')
      expect(account.email).toBe('johndoe@example.com')
      expect(account.password).toBe('123456')
    })

    it('should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
