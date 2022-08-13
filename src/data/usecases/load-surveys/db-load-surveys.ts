import { SurveyModel } from '../../../domain/model/survey'
import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveysRepository } from '../../protocols/db/surveys/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) { }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return await new Promise(resolve => resolve(null))
  }
}
