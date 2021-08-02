import {
  Hasher,
  AddAccountRepository,
  CheckAccountByEmailRepository
} from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(data: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      data.email
    )
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(data.password)
      isValid = await this.addAccountRepository.add({
        ...data,
        password: hashedPassword
      })
    }
    return isValid
  }
}
