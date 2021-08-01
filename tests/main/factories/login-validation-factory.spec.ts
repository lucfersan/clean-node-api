import { EmailValidatorAdapter } from '@/infra/validators'
import { makeLoginValidation } from '@/main/factories'
import { Validation } from '@/validation/protocols'
import {
  ValidationComposite,
  RequiredFieldsValidation,
  EmailValidation
} from '@/validation/validators'

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
