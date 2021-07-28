import {
  EncrypterSpy,
  HashComparerSpy,
  LoadAccountByEmailRepositorySpy,
  UpdateAccessTokenRepositorySpy
} from '@/data/test'
import { throwError, mockAuthenticationParams } from '@/domain/test'

import { DbAuthentication } from './db-authentication'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updatedAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updatedAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updatedAccessTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updatedAccessTokenRepositorySpy
  }
}

describe('DbAuthentication', () => {
  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(throwError)
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow()
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(
      authenticationParams.email
    )
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = null
    const authenticationParams = mockAuthenticationParams()
    const authenticationModel = await sut.auth(authenticationParams)
    expect(authenticationModel).toBeNull()
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(
      loadAccountByEmailRepositorySpy.accountModel.password
    )
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const authenticationParams = mockAuthenticationParams()
    const authenticationModel = await sut.auth(authenticationParams)
    expect(authenticationModel).toBeNull()
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow()
  })

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(encrypterSpy.plaintext).toBe(
      loadAccountByEmailRepositorySpy.accountModel.id
    )
  })

  it('should return a AuthenticationModel on success', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    const { accessToken, name } = await sut.auth(authenticationParams)
    expect(accessToken).toBe(encrypterSpy.ciphertext)
    expect(name).toBe(loadAccountByEmailRepositorySpy.accountModel.name)
  })

  it('should call UpdatedAccessTokenRepository with correct values', async () => {
    const {
      sut,
      updatedAccessTokenRepositorySpy,
      loadAccountByEmailRepositorySpy,
      encrypterSpy
    } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(updatedAccessTokenRepositorySpy.id).toBe(
      loadAccountByEmailRepositorySpy.accountModel.id
    )
    expect(updatedAccessTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext)
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updatedAccessTokenRepositorySpy } = makeSut()
    jest
      .spyOn(updatedAccessTokenRepositorySpy, 'updateAccessToken')
      .mockImplementationOnce(throwError)
    const authenticationParams = mockAuthenticationParams()
    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow()
  })
})
