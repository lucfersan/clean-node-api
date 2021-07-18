import { Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  RequiredFieldsValidation
} from '@/validation/validators'

import { makeAddSurveyController } from './add-survey-controller-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddSurveyValidationComposite', () => {
  it('should call ValidationComposite with all validations', () => {
    makeAddSurveyController()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
