import request from 'supertest'
import app from '@/main/config/app'

describe('Cors', () => {
  it('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      return res.send()
    })

    await request(app)
      .get('/test_cors')
      .send()
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
