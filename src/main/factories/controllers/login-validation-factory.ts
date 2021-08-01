import { EmailValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/validation/protocols'
import {
  ValidationComposite,
  RequiredFieldsValidation,
  EmailValidation
} from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
