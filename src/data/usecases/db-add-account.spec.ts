import { AddAccountModel } from '../../domain/usecases/add-account'
import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_value'
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
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
})
