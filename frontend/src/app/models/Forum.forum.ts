export class Forum {
  static id_user: number;
  static commentaire: string;
  static date: Date;
  constructor(
    public id_user: number,
    public commentaire: string,
    public date: Date
  ) { }

}
