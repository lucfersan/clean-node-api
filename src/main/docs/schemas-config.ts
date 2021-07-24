import {
  accountSchema,
  loginParamsSchema,
  signupParamsSchema,
  errorSchema,
  surveySchema,
  surveysSchema,
  surveyResultSchema,
  surveyAnswerSchema,
  addSurveyParamsSchema,
  surveyResultParamsSchema
} from './schemas'

export const schemasConfig = {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyResult: surveyResultSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  surveyResultParams: surveyResultParamsSchema
}
