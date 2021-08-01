import { DataAccountModel } from '@/data/protocols'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<DataAccountModel>
}
