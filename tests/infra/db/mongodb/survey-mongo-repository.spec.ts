import ObjectId from 'bson-objectid'
import { Collection } from 'mongodb'

import { MongoHelper, SurveyMongoRepository } from '@/infra/db'
import { mockAddAccountParams, mockAddSurveyParams } from '@/tests/domain/mocks'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

describe('SurveyMongoRepository', () => {
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
      const accountId = await mockAccountId()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const survey = MongoHelper.map(result.ops[0])
      await surveyResultCollection.insertOne({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadSurveys(accountId)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].id).toBeTruthy()
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    it('should return an empty array', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const surveys = await sut.loadSurveys(accountId)
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

    it('should return null if survey does not exist', async () => {
      const sut = makeSut()
      const id = new ObjectId().toHexString()
      const survey = await sut.loadById(id)
      expect(survey).toBeFalsy()
    })
  })

  describe('checkById()', () => {
    it('should return true if survey exists', async () => {
      const addSurveyParams = mockAddSurveyParams()
      const res = await surveyCollection.insertOne(addSurveyParams)
      const id = res.ops[0]._id
      const sut = makeSut()
      const exists = await sut.checkById(id)
      expect(exists).toBe(true)
    })

    it('should return false if survey does not exist', async () => {
      const sut = makeSut()
      const id = new ObjectId().toHexString()
      const exists = await sut.checkById(id)
      expect(exists).toBe(false)
    })
  })

  describe('loadAnswers()', () => {
    it('should load answers on success', async () => {
      const addSurveyParams = mockAddSurveyParams()
      const res = await surveyCollection.insertOne(addSurveyParams)
      const survey = res.ops[0]
      const sut = makeSut()
      const answers = await sut.loadAnswers(survey._id)
      expect(answers).toEqual([
        survey.answers[0].answer,
        survey.answers[1].answer
      ])
    })

    it('should return an empty if survey does not exist', async () => {
      const sut = makeSut()
      const id = new ObjectId().toHexString()
      const answers = await sut.loadAnswers(id)
      expect(answers).toEqual([])
    })
  })
})
