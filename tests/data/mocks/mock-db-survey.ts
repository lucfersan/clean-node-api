import faker from 'faker'

import {
  AddSurveyRepository,
  CheckSurveyByIdRepository,
  LoadAnswersBySurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveyResultRepository,
  LoadSurveysRepository,
  SaveSurveyResultRepository
} from '@/data/protocols'
import {
  mockSurveyModels,
  mockSurveyModel,
  mockSurveyResultModel
} from '@/tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params

  async add(
    data: AddSurveyRepository.Params
  ): Promise<AddSurveyRepository.Result> {
    this.addSurveyParams = data
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  result = mockSurveyModel()
  id: string

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadAnswersBySurveyRepositorySpy
  implements LoadAnswersBySurveyRepository
{
  result: LoadAnswersBySurveyRepository.Result = [
    faker.random.word(),
    faker.random.word()
  ]

  id: string

  async loadAnswers(id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  result = mockSurveyModels()
  accountId: string

  async loadSurveys(accountId: string): Promise<LoadSurveysRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class SaveSurveyResultRepositorySpy
  implements SaveSurveyResultRepository
{
  saveSurveyResultParams: SaveSurveyResultRepository.Params

  async save(
    data: SaveSurveyResultRepository.Params
  ): Promise<SaveSurveyResultRepository.Result> {
    this.saveSurveyResultParams = data
  }
}

export class LoadSurveyResultRepositorySpy
  implements LoadSurveyResultRepository
{
  surveyId: string
  accountId: string
  result = mockSurveyResultModel()

  async loadBySurveyId(
    surveyId: string,
    accountId: string
  ): Promise<LoadSurveyResultRepository.Result> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  result = true
  id: string

  async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
