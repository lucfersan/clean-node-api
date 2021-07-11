import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

describe('RequiredFieldsValidation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should not return a MissingParamError if validation succeeds', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
