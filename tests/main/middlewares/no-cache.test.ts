import request from 'supertest'

import app from '@/main/config/app'
import { noCache } from '@/main/middlewares'

describe('NoCache', () => {
  it('should disable cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      return res.send()
    })

    await request(app)
      .get('/test_no_cache')
      .send()
      .expect(
        'cache-control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
