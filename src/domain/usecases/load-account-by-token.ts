import { AccountModel } from '@/domain/models'

export interface LoadAccountByToken {
  load: (token: string, role?: string) => Promise<AccountModel>
}
