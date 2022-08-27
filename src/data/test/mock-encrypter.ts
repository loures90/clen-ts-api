import { Encrypter } from '../protocols/criptography/encrypter'

export const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('access_token'))
    }
  }
  return new EncrypterStub()
}
