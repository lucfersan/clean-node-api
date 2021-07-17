import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'

export interface DataAccountModel extends AccountModel {}
export interface DataAddAccountModel extends AddAccountModel {}
