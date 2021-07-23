import {
  badRequest,
  notFound,
  serverError,
  unauthorized,
  forbidden,
  noContent
} from './components'
import { loginPath, surveyPath } from './paths'
import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  apiKeyAuthSchema
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
      name: 'Login'
    },
    {
      name: 'Survey'
    }
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema
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
