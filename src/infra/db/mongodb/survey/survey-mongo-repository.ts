import {
  AddSurveyRepository,
  DataAddSurveyModel,
  DataSurveyModel,
  LoadSurveysRepository
} from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository
{
  async add(surveyData: DataAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadSurveys(): Promise<DataSurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: DataSurveyModel[] = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }
}
