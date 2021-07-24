import {
  loginPath,
  signupPath,
  surveyPath,
  surveyResultPath
} from '@/main/docs/paths'

export const pathsConfig = {
  '/login': loginPath,
  '/signup': signupPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
