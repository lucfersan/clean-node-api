import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/validation/test'

import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpies)
  return {
    validationSpies,
    sut
  }
}

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    jest
      .spyOn(validationSpies[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return the first error if more than one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    jest.spyOn(validationSpies[0], 'validate').mockReturnValueOnce(new Error())
    jest
      .spyOn(validationSpies[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  it('should not return an error if any validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
