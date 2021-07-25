import {
  AddSurveyRepository,
  DataSurveyResultModel,
  LoadSurveyByIdRepository,
  LoadSurveyResultRepository,
  LoadSurveysRepository,
  SaveSurveyResultRepository
} from '@/data/protocols'
import { SurveyModel, SurveyResultModel } from '@/domain/models'
import {
  mockFakeSurveys,
  mockSurveyModel,
  mockSurveyResultModel
} from '@/domain/test'
import { AddSurveyParams, SaveSurveyResultParams } from '@/domain/usecases'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {}
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadSurveys(): Promise<SurveyModel[]> {
      return mockFakeSurveys()
    }
  }
  return new LoadSurveysRepositoryStub()
}

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(
        surveyData: SaveSurveyResultParams
      ): Promise<SurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    return new SaveSurveyResultRepositoryStub()
  }

export const mockLoadSurveyResultRepository =
  (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId(surveyId: string): Promise<DataSurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    return new LoadSurveyResultRepositoryStub()
  }
