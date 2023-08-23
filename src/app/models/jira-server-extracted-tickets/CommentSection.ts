import {Comments} from "./Comments";

export class CommentSection{
  constructor(
    public id:number,
    public maxResults: number,
    public total: number,
    public startAt: number,
    public comments: Comments[]



  ){}
}
