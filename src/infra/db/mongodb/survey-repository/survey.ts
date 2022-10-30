import { ObjectId } from 'mongodb'
import { LoadSurveyByIdRepository } from '../../../../data/protocols/db/surveys/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../../../../data/protocols/db/surveys/load-surveys-repository'
import { AddSurveyParams, AddSurveyRepository } from '../../../../data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '../../../../domain/model/survey'
import { QueryBuilder } from '../helpers'
import { mongoHelper } from '../helpers/mongo-helper'

export class SurveyRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
    return null
  }

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = await mongoHelper.getCollection('surveys')

    const accountIdMongo = new ObjectId(accountId)
    const query = new QueryBuilder()
      .lookup({
        from: 'survey-results',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      }).project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', accountIdMongo]
                }
              }
            }
          }, 1]
        }
      }).build()

    const surveys = await surveyCollection.aggregate(query).toArray()
    return surveys.map(survey => mongoHelper.mapper(survey))
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    if (!survey) return null
    return mongoHelper.mapper(survey)
  }
}
