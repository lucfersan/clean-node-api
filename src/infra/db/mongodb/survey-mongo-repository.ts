import { ObjectId } from 'mongodb'

import {
  AddSurveyRepository,
  LoadSurveyByIdRepository,
  LoadSurveysRepository,
  CheckSurveyByIdRepository,
  LoadAnswersBySurveyRepository
} from '@/data/protocols'
import { MongoHelper, QueryBuilder } from '@/infra/db'

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository,
    CheckSurveyByIdRepository,
    LoadAnswersBySurveyRepository
{
  async add(
    data: AddSurveyRepository.Params
  ): Promise<AddSurveyRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadSurveys(accountId: string): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.accountId', new ObjectId(accountId)]
                  }
                }
              }
            },
            1
          ]
        }
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return surveys && MongoHelper.mapCollection(surveys)
  }

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }

  async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          _id: 1
        }
      }
    )
    return !!survey
  }

  async loadAnswers(id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(id)
      })
      .project({
        _id: 0,
        answers: '$answers.answer'
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return surveys[0]?.answers || []
  }
}
