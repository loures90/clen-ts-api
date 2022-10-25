import { mockAuthentication, HashComparerSpy, LoadAccountByEmailRepositorySpy, EncrypterSpy, UpdateAccessTokenRepositorySpy } from '../../../test'
import { DbAuthenticator } from './db-authenticator'

type SutTypes = {
  sut: DbAuthenticator
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const encrypterSpy = new EncrypterSpy()
  const hashComparerSpy = new HashComparerSpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAuthenticator(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthenticator', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthentication())
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email@email.com')
  })
  test('Should throws when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should returns null when LoadAccountByEmailRepository return null', async () => {
    const { sut } = makeSut()
    const res = await sut.auth({
      email: 'new_email@email.com',
      password: 'new_password'
    })
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
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthentication())
    expect(encrypterSpy.value).toBe(loadAccountByEmailRepositorySpy.account.id)
  })
  test('Should throws when Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should call UpdateAccessTokenRepository with correct access token', async () => {
    const { sut, updateAccessTokenRepositorySpy, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthentication())
    expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.account.id)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe('access_token')
  })
  test('Should throws when UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an AuthenticationModel on success', async () => {
    const { sut } = makeSut()
    const authenticationModel = await sut.auth(mockAuthentication())
    expect(authenticationModel).toEqual({
      token: 'access_token',
      name: 'any_name'
    })
  })
})
