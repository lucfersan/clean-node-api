import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

describe('RequiredFieldsValidation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
