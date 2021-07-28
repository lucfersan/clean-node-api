import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/validation/protocols'
import {
  ValidationComposite,
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation
} from '@/validation/validators'

import { makeSignUpValidation } from './signup-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidationComposite', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation')
    )
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
