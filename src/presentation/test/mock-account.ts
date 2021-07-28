import faker from 'faker'

import { AccountModel, AuthenticationModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import {
  AddAccount,
  AddAccountParams,
  Authentication,
  AuthenticationParams,
  LoadAccountByToken
} from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add(data: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = data
    return this.accountModel
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel: AuthenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth(data: AuthenticationParams): Promise<AuthenticationModel> {
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
