import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'

export const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStubStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new UpdateAccessTokenRepositoryStubStub()
}
