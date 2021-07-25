import {
  LoadSurveyResultRepository,
  DataSurveyResultModel
} from '@/data/protocols'
import { mockSurveyResultModel } from '@/domain/test'

import { DbLoadSurveyResult } from './db-load-survey-result'

describe('DbLoadSurveyResultUseCase', () => {
  it('should call LoadSurveyResultRepository with the correct id', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId(surveyId: string): Promise<DataSurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    )
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
