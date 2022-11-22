export class User {
  constructor(
    public name: string,
    public email: string,
    public picture: string,
    public family_name: string,
    public given_name: string,
    public id: string,
    public locale: string,
    public verified_email: boolean
  ) {}
}
