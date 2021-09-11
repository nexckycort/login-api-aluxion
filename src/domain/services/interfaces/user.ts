import { NewUser, User } from 'domain/models/user-model'

export interface IUserService {
  create: (newUser: NewUser) => Promise<User>
  update: (filter: any, item: any) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findByPk: (id: string) => Promise<User>
  findOne: (filter: any) => Promise<User | null>
}
