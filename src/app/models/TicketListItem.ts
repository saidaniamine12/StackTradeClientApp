import {User} from "./User";

export class TicketListItem {
  constructor(
    public id: string,
    public summary: string,
    public projectName: string,
    public description: string,
    public created: Date,
    public creatorName: String,
    public creatorEmailAddress: String
  ) {}

  static mapResponseToTicketList(response: any[]): TicketListItem[] {
    return response.map(ticket => new TicketListItem(
      ticket.id ,
      ticket.summary ?? "",
      ticket.projectName,
      ticket.description ?? "",
      new Date(ticket.created) ?? "",
      ticket.creatorName ?? "",
      ticket.creatorEmailAddress
    ));
  }
}
