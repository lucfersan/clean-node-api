import request from 'supertest'
import app from '../config/app'

describe('SignUp', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
