import { BaseRepository } from 'infrastructure/repositories/base/base-repository'
import { User } from 'domain/models/user-model'

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users')
  }

  async findByEmail(email: string) {
    const userRecord = await this.findOne({ email })
    return userRecord
  }
}
