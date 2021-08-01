import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import env from '@/main/config/env'

const makeAccessToken = async (): Promise<string> => {
  const password = await hash('any_password', 12)
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password,
    role: 'admin'
  })
  const id = result.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret, {
    expiresIn: '1d'
  })
  await accountCollection.updateOne(
    { _id: id },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

let surveyCollection: Collection
let accountCollection: Collection
describe('SurveyRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    it('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'http://image-name.com'
            },
            {
              answer: 'other_answer'
            }
          ]
        })
        .expect(403)
    })

    it('should return 204 on add survey with a valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'http://image-name.com'
            },
            {
              answer: 'other_answer'
            }
          ]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    it('should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403)
    })

    it('should return 200/204 on load surveys with a valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
