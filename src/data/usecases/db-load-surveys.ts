import { LoadSurveysRepository } from '@/data/protocols'
import { LoadSurveys } from '@/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load(accountId: string): Promise<LoadSurveys.Result> {
    const surveys = await this.loadSurveysRepository.loadSurveys(accountId)
    return surveys
  }
}
