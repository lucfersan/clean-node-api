import faker from 'faker'
import validator from 'validator'

import { EmailValidatorAdapter } from '@/infra/validators'
import { throwError } from '@/tests/domain/mocks'

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
    const email = faker.internet.email()
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })

  it('should return true if validation succeeds', () => {
    const sut = makeSut()
    const email = faker.internet.email()
    const isValid = sut.isValid(email)
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const email = faker.internet.email()
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })

  it('should throw if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(throwError)
    expect(sut.isValid).toThrow()
  })
})
