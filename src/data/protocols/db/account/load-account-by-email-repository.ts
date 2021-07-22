import { DataAccountModel } from '@/data/protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<DataAccountModel>
}
