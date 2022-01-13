export class PostImage {
  static idUser: number;
  static imgUrl: string;
  static comment: string;

  constructor(
    public idUser: number,
    public imgUrl: string,
    public comment: string
  ) { }
}
