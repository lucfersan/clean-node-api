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

  describe('add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()
      const surveyData = makeFakeSurveyData()
      await sut.add(surveyData)
      const survey = await surveyCollection.findOne({
        question: 'any_question'
      })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadSurveys()', () => {
    it('should load surveys', async () => {
      await surveyCollection.insertMany([
        {
          id: 'any_id',
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer'
            }
          ],
          date: new Date()
        },
        {
          id: 'other_id',
          question: 'other_question',
          answers: [
            {
              image: 'other_image',
              answer: 'other_answer'
            }
          ],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    it('should return an empty array', async () => {
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('should load survey by id', async () => {
      const response = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      })
      const id = response.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.question).toBe('any_question')
    })

    it('should return an empty array', async () => {
      const sut = makeSut()
      const surveys = await sut.loadSurveys()
      expect(surveys.length).toBe(0)
    })
  })
})
