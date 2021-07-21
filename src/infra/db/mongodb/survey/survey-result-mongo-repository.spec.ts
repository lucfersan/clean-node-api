import { Collection } from 'mongodb'

import { DataAccountModel, DataSurveyModel } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSurvey = async (): Promise<DataSurveyModel> => {
  const response = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        image: 'other_image',
        answer: 'other_answer'
      }
    ],
    date: new Date()
  })
  return MongoHelper.map(response.ops[0])
}

const makeAccount = async (): Promise<DataAccountModel> => {
  const response = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  return MongoHelper.map(response.ops[0])
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

describe('SurveyResultMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('save()', () => {
    it('should add a survey result if it is a new one', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.accountId).toEqual(account.id)
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    it('should update a survey result if it is not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const response = await surveyResultCollection.insertOne({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(response.ops[0]._id)
      expect(surveyResult.accountId).toEqual(account.id)
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
