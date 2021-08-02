import faker from 'faker'

import {
  AddAccount,
  Authentication,
  LoadAccountByToken
} from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  result = true
  addAccountParams: AddAccount.Params

  async add(data: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = data
    return this.result
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
  result: LoadAccountByToken.Result = {
    id: faker.datatype.uuid()
  }

  token: string
  role: string

  async load(token: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}
