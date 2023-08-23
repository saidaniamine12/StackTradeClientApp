import {StatusCategory} from "./StatusCategory";

export class Status{
  constructor(
    public id: string,
    public description: string,
    public name: string,
    public statusCategory: StatusCategory
  ) {
  }
}
