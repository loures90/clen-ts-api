import { LoadAccountByTokenRepository } from './db-load-account-by-token-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { mockLoadAccountByTokenRepository, mockAccount, DecrypterSpy } from '../../../test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositoryStub
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
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
  test('Should return null if loadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const response = await sut.load('any_token', 'any_role')
    expect(response).toBeNull()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const response = await sut.load('any_token', 'any_role')
    expect(response).toEqual(mockAccount())
  })
  test('Should throws when loadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(async () => {
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
