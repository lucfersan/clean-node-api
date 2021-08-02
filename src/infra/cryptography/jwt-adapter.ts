import jwt from 'jsonwebtoken'

import { Decrypter, Encrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, {
      expiresIn: '1d'
    })
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}