import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultParams } from '@/domain/usecases'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
      count: 0,
      percent: 0
    },
    {
      answer: 'other_answer',
      count: 0,
      percent: 0
    }
  ],
  date: new Date()
})
