import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import env from '../config/env'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

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
      const password = await hash('123456', 12)
      const result = await accountCollection.insertOne({
        name: 'John Doe',
        email: 'johndoe@example.com',
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
})
