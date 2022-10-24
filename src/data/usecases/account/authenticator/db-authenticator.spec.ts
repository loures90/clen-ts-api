import { mockEncrypter, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository, mockAuthentication, HashComparerSpy } from '../../../test'
import { DbAuthenticator } from './db-authenticator'
import {
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository
} from './db-authenticator-protocols'

type SutTypes = {
  sut: DbAuthenticator
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerSpy: HashComparerSpy
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const encrypterStub = mockEncrypter()
  const hashComparerSpy = new HashComparerSpy()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAuthenticator(loadAccountByEmailRepositoryStub, hashComparerSpy, encrypterStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerSpy,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthenticator', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  test('Should throws when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should returns null when LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const res = await sut.auth(mockAuthentication())
    expect(res).toBe(null)
  })
  test('Should call hashCompare with correct plaintext', async () => {
    const { sut, hashComparerSpy } = makeSut()
    await sut.auth(mockAuthentication())
    expect(hashComparerSpy.plaintext).toBe('any_password')
    expect(hashComparerSpy.digest).toBe('hash_password')
  })
  test('Should throws when hashCompare throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should returns null when hashComparerStub returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const res = await sut.auth(mockAuthentication())
    expect(res).toBe(null)
  })
  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should throws when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should call UpdateAccessTokenRepository with correct access token', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'access_token')
  })
  test('Should throws when UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an access_token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBe('access_token')
  })
})
