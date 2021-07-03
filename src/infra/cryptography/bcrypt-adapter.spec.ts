import bcrypt from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

describe('BcryptAdapter', () => {
  it('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('value')

    expect(hashSpy).toHaveBeenCalledWith('value', salt)
  })
})
