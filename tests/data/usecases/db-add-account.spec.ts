import { DbAddAccount } from '@/data/usecases'
import {
  AddAccountRepositorySpy,
  HasherSpy,
  LoadAccountByEmailRepositorySpy
} from '@/tests/data/mocks'
import {
  mockAccountModel,
  mockAddAccountParams,
  throwError
} from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  loadAccountByEmailRepositorySpy.accountModel = null
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(
    hasherSpy,
    loadAccountByEmailRepositorySpy,
    addAccountRepositorySpy
  )
  return {
    sut,
    hasherSpy,
    loadAccountByEmailRepositorySpy,
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

  it('should return an true on success', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const isAccountValid = await sut.add(addAccountParams)
    expect(isAccountValid).toBe(true)
  })

  it('should return false if LoadAccountByEmailRepository finds an account', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()
    const addAccountParams = mockAddAccountParams()
    const isAccountValid = await sut.add(addAccountParams)
    expect(isAccountValid).toBe(false)
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(throwError)
    const addAccountParams = mockAddAccountParams()
    const promise = sut.add(addAccountParams)
    await expect(promise).rejects.toThrow()
  })
})
