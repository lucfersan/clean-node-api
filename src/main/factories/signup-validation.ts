import { Validation } from '../../presentation/controllers/signup/signup-protocols'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation copy'
import { RequiredFieldsValidation } from '../../presentation/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
