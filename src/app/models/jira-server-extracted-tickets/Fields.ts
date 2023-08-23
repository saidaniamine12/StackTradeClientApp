import {Resolution} from "./Resolution";
import {JirUser} from "./JirUser";
import {IssueType} from "./IssueType";
import {Project} from "./Project";
import {CommentSection} from "./CommentSection";
import {Status} from "./Status";

export class Fields{
  constructor(
    public id:number,
    public resolution:Resolution,
    public assignee:JirUser,
    public reporter:JirUser,
    public creator:JirUser,
    public issueType:IssueType,
    public project:Project,
    public resolutiondate:Date,
    public created:Date,
    public updated:Date,
    public description:string,
    public summary:string,
    public comment:CommentSection,
    public status:Status,



  ) {
  }
}
