import { AccountModel, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount', () => {
  test('Should call Encrypter with corect password', async () => {
    const { sut, encrypterStub } = makeSut()
    const fakeAccountData: AddAccountModel = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(fakeAccountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })
  test('Should throws when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    const fakeAccountData: AddAccountModel = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error('')))
    })
    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with corect values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const fakeAccountData: AddAccountModel = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(fakeAccountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
  })
})
