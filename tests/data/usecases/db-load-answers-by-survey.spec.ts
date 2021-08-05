import faker from 'faker'

import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadAnswersBySurveyRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositorySpy =
    new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)
  return {
    sut,
    loadAnswersBySurveyRepositorySpy
  }
}

describe('DbLoadAnswersBySurvey', () => {
  let surveyId: string

  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  it('should call LoadAnswersByIdRepository with correct value', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    await sut.loadAnswers(surveyId)
    expect(loadAnswersBySurveyRepositorySpy.id).toBe(surveyId)
  })

  it('should return a list of answers on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const survey = await sut.loadAnswers(surveyId)
    expect(survey).toEqual([
      loadAnswersBySurveyRepositorySpy.result[0],
      loadAnswersBySurveyRepositorySpy.result[1]
    ])
  })

  it('should return an empty list if LoadAnswersByIdRepository returns  an empty list', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    loadAnswersBySurveyRepositorySpy.result = []
    const survey = await sut.loadAnswers(surveyId)
    expect(survey).toEqual([])
  })

  it('should throw if LoadAnswersByIdRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    jest
      .spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers')
      .mockImplementationOnce(throwError)
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
