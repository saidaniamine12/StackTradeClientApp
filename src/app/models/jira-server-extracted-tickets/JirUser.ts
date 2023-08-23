export class JirUser{

  constructor(
    public key: string,
    public name: string,
    public displayName: string,
    public active: boolean,
    public timeZone: string,
  ) {
  }
}
