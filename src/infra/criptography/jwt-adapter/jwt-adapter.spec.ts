import jsonwebtoken from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  },
  async verify (): Promise<string> {
    return 'any_value'
  }
}))

describe('JwtAdapter', () => {
  describe('Encrypt', () => {
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
  describe('Encrypt', () => {
    test('Should call verify with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const veirfySpy = jest.spyOn(jsonwebtoken, 'verify')
      await sut.decrypt('any_token')
      expect(veirfySpy).toHaveBeenCalledWith('any_token', 'secret')
    })
    test('Should return a decrypted value on success', async () => {
      const sut = new JwtAdapter('secret')
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })
    test('Should throw when jsonwebtoken throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce(async () => await new Promise((resolve, reject) => reject(new Error())))
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
