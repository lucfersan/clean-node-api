import { DataSurveyModel } from '@/data/protocols'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<DataSurveyModel>
}
