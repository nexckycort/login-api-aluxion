import jwt from 'jsonwebtoken'

import { AuthenticationToken } from 'infrastructure/interfaces/jwt-token'

export class JwtAdapter implements AuthenticationToken {
  constructor(private readonly seed: string) {
    this.seed = seed
  }

  async token(value: string): Promise<string> {
    const token = jwt.sign(
      {
        value
      },
      this.seed
    )
    return token
  }
}
