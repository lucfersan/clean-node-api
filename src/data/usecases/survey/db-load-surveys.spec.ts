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

describe('DbLoadSurveysUseCase', () => {
  it('should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadSurveys(): Promise<SurveyModel[]> {
        return await Promise.resolve(makeFakeSurveys())
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const loadSurveysSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    await sut.load()
    expect(loadSurveysSpy).toHaveBeenCalled()
  })
})
