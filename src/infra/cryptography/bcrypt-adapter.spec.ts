import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  it('should call hash with correct values', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('value')

    expect(hashSpy).toHaveBeenCalledWith('value', salt)
  })

  it('should return a valid hash on hash success', async () => {
    const sut = makeSut()

    const hash = await sut.hash('value')

    expect(hash).toBe('hash')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.hash('value')

    await expect(promise).rejects.toThrow()
  })

  it('should call compare with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  it('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  it('should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
