import { AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAddAccountRepository, mockLoadAccountByEmailRepository, mockAccount, mockAccountData, HasherSpy } from '../../../test/index'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(null)
  const sut = new DbAddAccount(hasherSpy, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherSpy,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount', () => {
  test('Should call Hasher with corect password', async () => {
    const { sut, hasherSpy } = makeSut()
    await sut.add(mockAccountData())
    expect(hasherSpy.plaintext).toBe('any_password')
  })
  test('Should throws when Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with corect values', async () => {
    const { sut, addAccountRepositoryStub, hasherSpy } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: hasherSpy.digest
    })
  })
  test('Should throws when AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAccountData())
    expect(account).toEqual(mockAccount())
  })
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAccountData())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  test('Should throws when loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null when loadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccount())))
    const account = await sut.add(mockAccountData())
    expect(account).toBeNull()
  })
})
