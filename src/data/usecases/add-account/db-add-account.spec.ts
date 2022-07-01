import { AccountModel, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HasherStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = makeFakeAccount()
      return fakeAccount
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const hasherStub = makeHasherStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount', () => {
  test('Should call Hasher with corect password', async () => {
    const { sut, hasherStub } = makeSut()
    const fakeAccountData: AddAccountModel = makeFakeAccountData()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(fakeAccountData)
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })
  test('Should throws when Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    const fakeAccountData: AddAccountModel = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with corect values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const fakeAccountData: AddAccountModel = makeFakeAccountData()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(fakeAccountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
  })
  test('Should throws when AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const fakeAccountData: AddAccountModel = makeFakeAccountData()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const fakeAccountData: AddAccountModel = makeFakeAccountData()
    const account = await sut.add(fakeAccountData)
    expect(account).toEqual(makeFakeAccount())
  })
})
