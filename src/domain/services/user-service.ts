import { UserRepository } from 'infrastructure/repositories/user-repository'
import { RijndaelAdapter } from 'domain/interfaces/rijndael'
import { User, NewUser } from 'domain/models/user-model'
import { IUserService } from './interfaces/user'

export class UserService implements IUserService {
  constructor(private readonly rijndaelAdapter: RijndaelAdapter, private readonly userRepository: UserRepository) {}

  async create(newUser: NewUser) {
    const { name, password, email } = newUser
    const passwordHash = await this.rijndaelAdapter.encrypt(password)
    const user = new User(name, passwordHash, email, this.rijndaelAdapter.saltText)
    const userRecord = await this.userRepository.create(user)
    return userRecord
  }

  async update(filter: any, item: any) {
    const userRecord = await this.userRepository.update(filter, item)
    return userRecord
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async findByPk(id: string): Promise<User> {
    return await this.userRepository.findByPk(id)
  }

  async findOne(filter: any) {
    return await this.userRepository.findOne(filter)
  }
}
