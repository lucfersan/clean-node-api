import { ServerError, MissingParamError } from '../../errors'
import {
  AddAccount,
  AccountModel,
  AddAccountModel,
  Validation,
  Authentication,
  AuthenticationModel
} from './signup-controller-protocols'
import { SignUpController } from './signup-controller'
import { HttpRequest } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    passwordConfirmation: '123456'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authenticationData: AuthenticationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub
  )

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUpController', () => {
  it('should call AddAccount with the correct values', async () => {
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toBeCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
  })

  it('should return 500 if add account throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpResponse = await sut.handle(makeFakeHttpRequest())

    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeHttpRequest())

    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  it('should call Validation with the correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toBeCalledWith(httpRequest.body)
  })

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeHttpRequest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'johndoe@example.com',
      password: '123456'
    })
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()

    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
