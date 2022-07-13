import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jsonwebtoken from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jsonwebtoken.sign(value, this.secret)
    return accessToken
  }
}
