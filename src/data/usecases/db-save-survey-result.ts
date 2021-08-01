import {
  LoadSurveyResultRepository,
  SaveSurveyResultRepository
} from '@/data/protocols'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(surveyData: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(surveyData)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyData.surveyId,
      surveyData.accountId
    )
    return surveyResult
  }
}
