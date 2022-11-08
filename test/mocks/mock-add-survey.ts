import { AddSurvey, AddSurveyParams } from '../../src/domain/usecases/add-survey'

export class AddSurveySpy implements AddSurvey {
  data: AddSurveyParams
  async add (data: AddSurveyParams): Promise<void> {
    this.data = data
  }
}

