import { DataAddSurveyParams } from '@/data/protocols'

export interface AddSurveyRepository {
  add: (data: DataAddSurveyParams) => Promise<void>
}
