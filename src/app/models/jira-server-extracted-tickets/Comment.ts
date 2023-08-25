import {Comments} from "./Comments";

export class Comment {
  constructor(
    public id:number,
    public maxResults: number,
    public total: number,
    public startAt: number,
    public comments: Comments[]



  ){}
}
