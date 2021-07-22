import { DataAccountModel, DataAddAccountParams } from '@/data/protocols'

export interface AddAccountRepository {
  add: (accountData: DataAddAccountParams) => Promise<DataAccountModel>
}
