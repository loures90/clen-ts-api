import { Encrypter } from '../protocols/criptography/encrypter'
import { Decrypter } from '../protocols/criptography/decrypter'

export class DecrypterSpy implements Decrypter {
  value: string
  token: string
  async decrypt (token: string): Promise<string> {
    this.token = token
    if (this.token === 'any_token') {
      this.value = 'any_value'
    } else {
      this.value = null
    }
    return await new Promise(resolve => resolve(this.value))
  }
}

export class EncrypterSpy implements Encrypter {
  value: string
  token: string
  async encrypt (value: string): Promise<string> {
    this.value = value
    this.token = 'access_token'
    return await new Promise(resolve => resolve(this.token))
  }
}
