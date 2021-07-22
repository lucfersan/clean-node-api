import { DataAddSurveyParams } from '@/data/protocols'

export interface AddSurveyRepository {
  add: (surveyData: DataAddSurveyParams) => Promise<void>
}
