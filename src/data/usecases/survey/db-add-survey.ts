import { AddSurveyRepository } from '@/data/protocols'
import { AddSurvey, AddSurveyModel } from '@/domain/usecases'

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(surveyData: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(surveyData)
  }
}
