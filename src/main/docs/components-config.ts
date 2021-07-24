import {
  badRequestComponent,
  serverErrorComponent,
  unauthorizedComponent,
  notFoundComponent,
  forbiddenComponent,
  noContentComponent
} from './components'
import { apiKeyAuthSchema } from './schemas'

export const componentsConfig = {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest: badRequestComponent,
  serverError: serverErrorComponent,
  unauthorized: unauthorizedComponent,
  notFound: notFoundComponent,
  forbidden: forbiddenComponent,
  noContent: noContentComponent
}
