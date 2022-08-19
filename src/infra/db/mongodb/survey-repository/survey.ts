import { LoadSurveysRepository } from '../../../../data/protocols/db/surveys/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyModel } from '../../../../domain/model/survey'
import mongoHelper from '../helpers/mongo-helper'

export class SurveyRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
    return null
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys.map(survey => mongoHelper.mapper(survey))
  }
}
