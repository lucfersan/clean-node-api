import {
  badRequest,
  notFound,
  serverError,
  unauthorized,
  forbidden,
  noContent
} from './components'
import { loginPath, signupPath, surveyPath, surveyResultPath } from './paths'
import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  apiKeyAuthSchema,
  addSurveyParamsSchema,
  surveyResultParamsSchema,
  surveyResultSchema
} from './schemas'

const configDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description:
      "This API was made to perform surveys between programmers developed at Rodrigo Manguinho's course.",
    version: '1.0.0'
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    {
      name: 'Authentication'
    },
    {
      name: 'Survey'
    }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
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
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
    noContent
  }
}

export default configDocs
