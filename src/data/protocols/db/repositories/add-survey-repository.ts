import { AddSurvey } from '@/domain/usecases'

export interface AddSurveyRepository {
  add: (data: AddSurveyRepository.Params) => Promise<AddSurveyRepository.Result>
}

export namespace AddSurveyRepository {
  export type Params = AddSurvey.Params
  export type Result = AddSurvey.Result
}
