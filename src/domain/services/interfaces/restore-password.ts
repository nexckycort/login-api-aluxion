export interface IRestorePasswordService {
  sendMailToRestorePassword: (email: string) => Promise<boolean>
  restorePassword: (hash: string, password: string) => Promise<boolean>
}
