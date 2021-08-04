import faker from 'faker'

import { SurveyModel } from '@/domain/models'
import {
  AddSurvey,
  LoadAnswersBySurvey,
  LoadSurveys,
  CheckSurveyById
} from '@/domain/usecases'
import { mockSurveyModels } from '@/tests/domain/mocks'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params

  async add(data: AddSurvey.Params): Promise<AddSurvey.Result> {
    this.addSurveyParams = data
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  result: LoadAnswersBySurvey.Result = [
    faker.random.word(),
    faker.random.word()
  ]

  id: string

  async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string

  async load(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModels
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById(id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
