import { DataSurveyModel } from '@/data/protocols'

export interface LoadSurveysRepository {
  loadSurveys: (accountId: string) => Promise<DataSurveyModel[]>
}
