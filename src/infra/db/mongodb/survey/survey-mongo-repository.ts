import {
  AddSurveyRepository,
  DataAddSurveyModel,
  DataSurveyModel,
  LoadSurveyByIdRepository,
  LoadSurveysRepository
} from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(surveyData: DataAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadSurveys(): Promise<DataSurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById(id: string): Promise<DataSurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: id })
    return MongoHelper.map(survey)
  }
}
