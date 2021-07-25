import { DataSaveSurveyResultParams } from '@/data/protocols'

export interface SaveSurveyResultRepository {
  save: (data: DataSaveSurveyResultParams) => Promise<void>
}
