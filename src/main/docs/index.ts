import { componentsConfig } from './components-config'
import { pathsConfig } from './paths-config'
import { schemasConfig } from './schemas-config'

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
  paths: pathsConfig,
  schemas: schemasConfig,
  components: componentsConfig
}

export default configDocs
