export class IssueType{
  constructor(
    public id: string,
    public description: string,
    public name: string,
    public subtask: boolean
  ) {
  }
}
