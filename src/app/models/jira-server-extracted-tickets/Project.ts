import {ProjectCategory} from "./ProjectCategory";

export class Project{
  constructor(
    public id: string,
    public key: string,
    public name: string,
    public projectTypeKey: string,
    public projectCategory: ProjectCategory,
  ) {
  }
}
