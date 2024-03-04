export class AuthUser {
  constructor(
    public full_name: string,
    public email: string,
    public username: string,
    public avatar: string,
    public phone_code: string,
    public phone_no: string,
    public balance: number,
    public auth_provider: string,
    public access_token: string
  ) {}
}
