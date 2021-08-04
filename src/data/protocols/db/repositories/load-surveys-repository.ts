import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  loadSurveys: (accountId: string) => Promise<SurveyModel[]>
}
