import faker from 'faker'

import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldsValidation } from '@/validation/validators'

const field = faker.random.word()

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation(field)
}

describe('RequiredFieldsValidation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.random.word() })
    expect(error).toEqual(new MissingParamError(field))
  })

  it('should not return a MissingParamError if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
