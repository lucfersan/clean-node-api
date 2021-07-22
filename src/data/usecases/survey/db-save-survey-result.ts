import { SaveSurveyResultRepository } from '@/data/protocols'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(surveyData: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const survey = await this.saveSurveyResultRepository.save(surveyData)
    return survey
  }
}
