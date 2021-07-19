import { SurveyModel } from '@/domain/models'

export interface LoadSurveyById {
  loadById: () => Promise<SurveyModel>
}
