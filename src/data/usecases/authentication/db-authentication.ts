import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { TokenGenerator } from '../../protocols/cryptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth (authenticationData: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authenticationData.email)
    if (account) {
      await this.hashComparer.compare(authenticationData.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}