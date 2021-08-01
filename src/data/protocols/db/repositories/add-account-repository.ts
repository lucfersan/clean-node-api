import { DataAccountModel, DataAddAccountParams } from '@/data/protocols'

export interface AddAccountRepository {
  add: (data: DataAddAccountParams) => Promise<DataAccountModel>
}
