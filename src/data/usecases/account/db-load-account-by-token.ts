import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { AccountModel } from '../authentication/db-authentication-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(token: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token)
    return await Promise.resolve(null)
  }
}
