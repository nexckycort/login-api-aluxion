export class User {
  public _id!: string
  public expira_token!: Date
  public token!: string
  constructor(readonly name: string, readonly password: string, readonly email: string, readonly salt: string) {}
}

export interface NewUser {
  name: string
  email: string
  password: string
}
