import faker from 'faker'

import { AccountModel } from '@/domain/models'
import {
  AddAccount,
  Authentication,
  LoadAccountByToken
} from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  isValid = true
  addAccountParams: AddAccount.Params

  async add(data: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = data
    return this.isValid
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel: Authentication.Result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth(data: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = data
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  token: string
  role: string

  async load(token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return this.accountModel
  }
}
