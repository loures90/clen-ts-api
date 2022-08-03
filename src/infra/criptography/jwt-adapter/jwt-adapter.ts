import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import jsonwebtoken from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jsonwebtoken.sign(value, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    await jsonwebtoken.verify(token, this.secret)
    return null
  }
}
