import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  it('should return false if validation fails', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  it('should return true if validation succeeds', () => {
    const sut = makeSut()

    const isValid = sut.isValid('johndoe@example.com')

    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = makeSut()

    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('johndoe@example.com')

    expect(isEmailSpy).toHaveBeenCalledWith('johndoe@example.com')
  })

  it('should throw if validator throws', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.isValid).toThrow()
  })
})
