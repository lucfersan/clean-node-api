import { badRequest, notFound, serverError, unauthorized } from './components'
import { loginPath } from './paths'
import { accountSchema, errorSchema, loginParamsSchema } from './schemas'

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
      url: 'lfs-clean-api.herokuapp.com/api',
      description: 'This is the production URL'
    },
    {
      url: 'localhost:3333/api',
      description: 'This is the development URL'
    }
  ],
  tags: [
    {
      name: 'Login'
    }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}

export default configDocs
