import { DbAddAccount } from './db-add-account'

describe('DbAddAccountUseCase', () => {
  it('should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (password: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('123456')
  })
})
