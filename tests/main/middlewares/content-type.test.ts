import request from 'supertest'

import app from '@/main/config/app'

describe('ContentType', () => {
  it('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      return res.send()
    })

    await request(app).get('/test_content_type').expect('content-type', /json/)
  })

  it('should return xml type content when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      return res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
