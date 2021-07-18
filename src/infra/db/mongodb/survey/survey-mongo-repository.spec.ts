import { Collection } from 'mongodb'

import { DataAddSurveyModel } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

import { SurveyMongoRepository } from './survey-mongo-repository'

const makeFakeSurveyData = (): DataAddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }
  ],
  date: new Date()
})

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection
describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should add a survey on success', async () => {
    const sut = makeSut()
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
