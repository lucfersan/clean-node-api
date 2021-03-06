import { makeAddSurveyController } from '@/main/factories'
import { Validation } from '@/validation/protocols'
import {
  ValidationComposite,
  RequiredFieldsValidation
} from '@/validation/validators'

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
