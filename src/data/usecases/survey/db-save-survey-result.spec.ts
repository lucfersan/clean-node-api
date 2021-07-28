import MockDate from 'mockdate'

import {
  LoadSurveyResultRepositorySpy,
  SaveSurveyResultRepositorySpy
} from '@/data/test'
import { mockSaveSurveyResultParams, throwError } from '@/domain/test'

import { DbSaveSurveyResult } from './db-save-survey-result'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositorySpy: SaveSurveyResultRepositorySpy
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositorySpy = new SaveSurveyResultRepositorySpy()
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositorySpy,
    loadSurveyResultRepositorySpy
  )
  return {
    sut,
    saveSurveyResultRepositorySpy,
    loadSurveyResultRepositorySpy
  }
}

describe('DbSaveSurveyResultUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(saveSurveyResultRepositorySpy.saveSurveyResultParams).toEqual(
      saveSurveyResultParams
    )
  })

  it('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    jest
      .spyOn(saveSurveyResultRepositorySpy, 'save')
      .mockImplementationOnce(throwError)
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    const promise = sut.save(saveSurveyResultParams)
    await expect(promise).rejects.toThrow()
  })

  it('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(
      saveSurveyResultParams.surveyId
    )
  })

  it('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest
      .spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId')
      .mockImplementationOnce(throwError)
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    const promise = sut.save(saveSurveyResultParams)
    await expect(promise).rejects.toThrow()
  })

  it('should return a survey on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    const survey = await sut.save(saveSurveyResultParams)
    expect(survey).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })
})
