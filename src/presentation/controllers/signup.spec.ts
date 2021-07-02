import { MissingParamError } from '../errors/missing-param'
import { SignUpController } from './signup'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUpController', () => {
  it('should return 400 if no name is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        email: 'johndoe@example.com',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        password: '123456',
        passwordConfirmation: '123456'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  it('should return 400 if no password is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordConfirmation: '123456'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  it('should return 400 if no password confirmation is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})
