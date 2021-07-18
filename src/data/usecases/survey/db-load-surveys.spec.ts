import { LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'

import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
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
  ]
}

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadSurveys(): Promise<SurveyModel[]> {
      return await Promise.resolve(makeFakeSurveys())
    }
  }
  return new LoadSurveysRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveysUseCase', () => {
  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    await sut.load()
    expect(loadSurveysSpy).toHaveBeenCalled()
  })

  it('should return a surveys array on LoadSurveysRepository success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })
})
