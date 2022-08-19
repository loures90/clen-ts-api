import { AddSurveyResultRepository } from '../../../../data/protocols/db/survey-result/add-survey-result-repository'
import { SurveyResultModel } from '../../../../domain/model/survey-result'
import { AddSurveyResultModel } from '../../../../domain/usecases/add-survey-result'
import mongoHelper from '../helpers/mongo-helper'

export class SurveyResultRepository implements AddSurveyResultRepository {
  async add (data: AddSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultData = { ...data }
    const surveyCollection = await mongoHelper.getCollection('survey-results')
    const result = await surveyCollection.findOneAndUpdate({
      accountId: surveyResultData.accountId,
      surveyId: surveyResultData.surveyId
    }, {
      $set: {
        answer: surveyResultData.answer,
        date: surveyResultData.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return mongoHelper.mapper(result.value)
  }
}
