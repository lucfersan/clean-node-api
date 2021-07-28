import { Collection } from 'mongodb'

import { mockAddSurveyParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db'

import { SurveyMongoRepository } from './survey-mongo-repository'

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

  describe('add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()
      const addSurveyParams = mockAddSurveyParams()
      await sut.add(addSurveyParams)
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadSurveys()', () => {
    it('should load surveys', async () => {
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      await surveyCollection.insertMany(addSurveyModels)
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[1].id).toBeTruthy()
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
    })

    it('should return an empty array', async () => {
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('should load survey by id', async () => {
      const addSurveyParams = mockAddSurveyParams()
      const res = await surveyCollection.insertOne(addSurveyParams)
      const id = res.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
      expect(survey.question).toBe(addSurveyParams.question)
      expect(survey.answers).toEqual(addSurveyParams.answers)
      expect(survey.date).toEqual(addSurveyParams.date)
    })
  })
})
