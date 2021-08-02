import { DbAddAccount } from '@/data/usecases'
import {
  AddAccountRepositorySpy,
  HasherSpy,
  CheckAccountByEmailRepositorySpy
} from '@/tests/data/mocks'
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const checkAccountByEmailRepositorySpy =
    new CheckAccountByEmailRepositorySpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(
    hasherSpy,
    checkAccountByEmailRepositorySpy,
    addAccountRepositorySpy
  )
  return {
    sut,
    hasherSpy,
    checkAccountByEmailRepositorySpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  it('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const addAccountParams = mockAddAccountParams()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError)
    const addAccountParams = mockAddAccountParams()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow()
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const isAccountValid = await sut.add(addAccountParams)
    expect(isAccountValid).toBe(true)
  })

  it('should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    addAccountRepositorySpy.result = false
    const addAccountParams = mockAddAccountParams()
    const isAccountValid = await sut.add(addAccountParams)
    expect(isAccountValid).toBe(false)
  })

  it('should return true if CheckAccountByEmailRepository returns false', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const isAccountValid = await sut.add(addAccountParams)
    expect(isAccountValid).toBe(true)
  })

  it('should return false if CheckAccountByEmailRepository returns', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const addAccountParams = mockAddAccountParams()
    const isAccountValid = await sut.add(addAccountParams)
    expect(isAccountValid).toBe(false)
  })

  it('should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  it('should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockImplementationOnce(throwError)
    const addAccountParams = mockAddAccountParams()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow()
  })
})
