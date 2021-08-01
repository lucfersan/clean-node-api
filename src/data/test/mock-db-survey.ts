import {
  AddSurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveyResultRepository,
  LoadSurveysRepository,
  SaveSurveyResultRepository
} from '@/data/protocols'
import { SurveyModel, SurveyResultModel } from '@/domain/models'
import {
  mockSurveyModels,
  mockSurveyModel,
  mockSurveyResultModel
} from '@/domain/test'
import { AddSurveyParams, SaveSurveyResultParams } from '@/domain/usecases'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add(data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel()
  id: string

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveys = mockSurveyModels()
  accountId: string

  async loadSurveys(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveys
  }
}

export class SaveSurveyResultRepositorySpy
  implements SaveSurveyResultRepository
{
  saveSurveyResultParams: SaveSurveyResultParams

  async save(data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data
  }
}

export class LoadSurveyResultRepositorySpy
  implements LoadSurveyResultRepository
{
  surveyId: string
  accountId: string
  surveyResultModel = mockSurveyResultModel()

  async loadBySurveyId(
    surveyId: string,
    accountId: string
  ): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.surveyResultModel
  }
}
