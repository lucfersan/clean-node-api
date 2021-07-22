import { DataSurveyModel } from '@/data/protocols'

export interface LoadSurveysRepository {
  loadSurveys: () => Promise<DataSurveyModel[]>
}
