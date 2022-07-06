import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jsonwebtoken from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jsonwebtoken.sign(value, this.secret)
    return await new Promise(resolve => resolve(null))
  }
}
