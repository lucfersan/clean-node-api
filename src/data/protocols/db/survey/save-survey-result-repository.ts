import {
  DataSurveyResultModel,
  DataSaveSurveyResultParams
} from '@/data/protocols'

export interface SaveSurveyResultRepository {
  save: (data: DataSaveSurveyResultParams) => Promise<DataSurveyResultModel>
}
