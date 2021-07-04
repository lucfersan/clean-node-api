import request from 'supertest'
import app from '../config/app'

describe('BodyParser', () => {
  it('should be able to parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      return res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' })
  })
})
