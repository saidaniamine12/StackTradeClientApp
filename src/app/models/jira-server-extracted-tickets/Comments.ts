import {JirUser} from "./JirUser";

export class Comments{
  constructor(
    public id: string,
    public author: JirUser,
    public body: string,
    public updated: Date,
    public created: Date,
  ) {
  }
  getCreated(): Date {
    return this.created;
  }

}
