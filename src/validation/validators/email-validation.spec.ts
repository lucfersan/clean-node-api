import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols/email-validator'

import { EmailValidation } from './email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation', () => {
  it('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const error = sut.validate({ email: 'johndoe@example.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should call EmailValidator with the correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValiSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'johndoe@example.com' })
    expect(isValiSpy).toBeCalledWith('johndoe@example.com')
  })

  it('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})
