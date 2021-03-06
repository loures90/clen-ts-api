import jsonwebtoken from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  }
}))

describe('JwtAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jsonwebtoken, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith('any_value', 'secret')
  })
  test('Should return an accessToken on success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_value')
    expect(accessToken).toBe('any_token')
  })
  test('Should throw when jsonwebtoken throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(async () => await new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
