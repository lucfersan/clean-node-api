export const serverErrorComponent = {
  description: 'Internal server error',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
