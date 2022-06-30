import { AuthenticationModel, Authenticator } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthenticator implements Authenticator {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
