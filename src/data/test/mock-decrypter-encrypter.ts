import { Encrypter } from '../protocols/criptography/encrypter'
import { Decrypter } from '../protocols/criptography/decrypter'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('access_token'))
    }
  }
  return new EncrypterStub()
}
