import {
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(data: AddAccountParams): Promise<AccountModel> {
    const userExists = await this.loadAccountByEmailRepository.loadByEmail(
      data.email
    )
    if (userExists) {
      return null
    }
    const hashedPassword = await this.hasher.hash(data.password)
    const account = await this.addAccountRepository.add({
      name: data.name,
      email: data.email,
      password: hashedPassword
    })
    return account
  }
}
