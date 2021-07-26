import { SurveyModel, SurveyResultModel } from '@/domain/models'
import {
  mockSurveyModel,
  mockFakeSurveys,
  mockSurveyResultModel
} from '@/domain/test'
import {
  AddSurvey,
  AddSurveyParams,
  LoadSurveyById,
  LoadSurveyResult,
  LoadSurveys
} from '@/domain/usecases'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(surveyData: AddSurveyParams): Promise<void> {}
  }
  return new AddSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return mockFakeSurveys()
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(surveyId: string): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new LoadSurveyResultStub()
}
