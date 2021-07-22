import {
  SaveSurveyResultRepository,
  DataSurveyResultModel,
  DataSaveSurveyResultParams
} from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: DataSaveSurveyResultParams): Promise<DataSurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      'surveyResults'
    )
    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId
      },
      {
        $set: {
          answer: data.answer,
          data: data.date
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return MongoHelper.map(surveyResult.value)
  }
}
