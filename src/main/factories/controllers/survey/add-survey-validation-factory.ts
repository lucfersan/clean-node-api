import { Validation } from '@/presentation/controllers/signup/signup-controller-protocols'
import {
  ValidationComposite,
  RequiredFieldsValidation
} from '@/validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
