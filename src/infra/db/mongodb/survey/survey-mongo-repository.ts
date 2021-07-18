import { AddSurveyRepository, DataAddSurveyModel } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add(surveyData: DataAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
