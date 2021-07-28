import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import {
  AddSurvey,
  AddSurveyParams,
  LoadSurveyById,
  LoadSurveys
} from '@/domain/usecases'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add(data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  callsCount = 0

  async load(): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveyModels
  }
}
