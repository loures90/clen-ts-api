import { ObjectID } from 'bson'
import { LoadSurveyByIdRepository } from '../../../../data/protocols/db/surveys/load-survey-by-id-repository'
import { LoadSurveysRepository } from '../../../../data/protocols/db/surveys/load-surveys-repository'
import { AddSurveyParams, AddSurveyRepository } from '../../../../data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '../../../../domain/model/survey'
import mongoHelper from '../helpers/mongo-helper'

export class SurveyRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
    return null
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys.map(survey => mongoHelper.mapper(survey))
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectID(id) })
    if (!survey) return null
    return mongoHelper.mapper(survey)
  }
}
