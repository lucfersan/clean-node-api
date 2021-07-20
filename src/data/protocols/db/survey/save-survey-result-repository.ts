import { SurveyResultModel } from '@/domain/models'
import { AddSaveSurveyResultModel } from '@/domain/usecases'

export interface SaveSurveyResultRepository {
  save: (data: AddSaveSurveyResultModel) => Promise<SurveyResultModel>
}
