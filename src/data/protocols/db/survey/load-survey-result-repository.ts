import { DataSurveyResultModel } from '@/data/protocols'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<DataSurveyResultModel>
}
