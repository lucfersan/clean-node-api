import { DataSurveyResultModel } from '@/data/protocols'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (
    surveyId: string,
    accountId: string
  ) => Promise<DataSurveyResultModel>
}
