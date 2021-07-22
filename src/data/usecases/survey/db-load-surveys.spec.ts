import MockDate from 'mockdate'

import { LoadSurveysRepository } from '@/data/protocols'
import { mockLoadSurveysRepository } from '@/data/test'
import { mockFakeSurveys } from '@/domain/test'

import { DbLoadSurveys } from './db-load-surveys'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveysUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    await sut.load()
    expect(loadSurveysSpy).toHaveBeenCalled()
  })

  it('should return a surveys array on LoadSurveysRepository success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockFakeSurveys())
  })

  it('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadSurveys')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
