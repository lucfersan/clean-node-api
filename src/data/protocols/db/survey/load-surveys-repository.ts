import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  loadSurveys: () => Promise<SurveyModel[]>
}
