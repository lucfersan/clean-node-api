import { AccountModel } from '@/domain/models'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
