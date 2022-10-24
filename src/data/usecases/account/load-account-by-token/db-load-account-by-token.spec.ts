import { DbLoadAccountByToken } from './db-load-account-by-token'
import { mockAccount, DecrypterSpy, LoadAccountByTokenRepositorySpy } from '../../../test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct acessToken', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy.token).toBe('any_token')
  })
  test('Should return if Decrypter returns null', async () => {
    const { sut } = makeSut()
    const response = await sut.load('wrong_token', 'any_role')
    expect(response).toBeNull()
  })
  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy.token).toBe('any_token')
    expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
  })
  test('Should return null if loadAccountByTokenRepository returns null', async () => {
    const { sut } = makeSut()
    const response = await sut.load('wrong_token', 'any_role')
    expect(response).toBeNull()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const response = await sut.load('any_token', 'any_role')
    expect(response).toEqual(mockAccount())
  })
  test('Should throws when loadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
  test('Should throws when Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
