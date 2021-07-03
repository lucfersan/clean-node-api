import bcrypt from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('value')

    expect(hashSpy).toHaveBeenCalledWith('value', salt)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('value')

    expect(hash).toBe('hash')
  })
})
