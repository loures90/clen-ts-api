import { DbAddAccount } from './db-add-account'
import { mockAccount, mockAccountData, HasherSpy, AddAccountRepositorySpy, LoadAccountByEmailRepositorySpy } from '../../../test/index'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount', () => {
  test('Should call Hasher with corect password', async () => {
    const { sut, hasherSpy } = makeSut()
    await sut.add(mockAccountData())
    expect(hasherSpy.plaintext).toBe('new_password')
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
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    await sut.add(mockAccountData())
    expect(addAccountRepositorySpy.accountData).toEqual({
      name: 'new_name',
      email: 'new_email@email.com',
      password: hasherSpy.digest
    })
  })
  test('Should throws when AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(async () => {
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
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.add(mockAccountData())
    expect(loadAccountByEmailRepositorySpy.email).toBe('new_email@email.com')
  })
  test('Should throws when loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null when loadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccount())))
    const account = await sut.add(mockAccountData())
    expect(account).toBeNull()
  })
})
