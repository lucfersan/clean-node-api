import { Validation } from '../../../../presentation/controllers/signup/signup-controller-protocols'
import {
  ValidationComposite,
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation
} from '../../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation')
  )
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}