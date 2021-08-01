import {
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(data: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      data.email
    )
    let newAccount: AccountModel
    if (!account) {
      const hashedPassword = await this.hasher.hash(data.password)
      newAccount = await this.addAccountRepository.add({
        ...data,
        password: hashedPassword
      })
    }
    return !!newAccount
  }
}
