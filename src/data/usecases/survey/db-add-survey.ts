import { AddSurvey, AddSurveyParams, AddSurveyRepository } from './protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) { }
  async add (data: AddSurveyParams): Promise<void> {
    return await this.addSurveyRepository.add(data)
  }
}
