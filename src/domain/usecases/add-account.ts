import { AccountModel } from '@/domain/models'

export type AddAccountParams = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
