import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/validation/protocols'
import {
  ValidationComposite,
  RequiredFieldsValidation,
  EmailValidation
} from '@/validation/validators'

import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidationComposite', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
