import { SaveSurveyResultRepository } from '@/data/protocols'
import { DataSaveSurveyResultParams } from '@/data/protocols/db/models/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: DataSaveSurveyResultParams): Promise<SurveyResultModel> {
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
