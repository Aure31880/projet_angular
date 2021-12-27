export class User {
  static id: number;
  static firstName: string;
  static lastName: string;
  static email: string;
  static password: string;
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) { }

}
