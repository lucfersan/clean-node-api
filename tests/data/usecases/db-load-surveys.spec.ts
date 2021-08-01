import faker from 'faker'
import MockDate from 'mockdate'

import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('DbLoadSurveysUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveysRepository with correct value', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    await sut.load(accountId)
    expect(loadSurveysRepositorySpy.accountId).toBe(accountId)
  })

  it('should return a surveys array on LoadSurveysRepository success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    const surveys = await sut.load(accountId)
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveys)
  })

  it('should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest
      .spyOn(loadSurveysRepositorySpy, 'loadSurveys')
      .mockImplementationOnce(throwError)
    const accountId = faker.datatype.uuid()
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
