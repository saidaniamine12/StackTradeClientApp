import {User} from "./User";

export class Ticket {


  constructor(
    public id: string,
    public key: string,
    public summary: string,
    public projectName: string,
    public description: string,
    public resolutionDate: Date,
    public reporterName: String,
    public assigneeName: String
  ) {}

  static mapResponseToTicketList(response: any[]): Ticket[] {
    return response.map(ticket => new Ticket(
      ticket.id ?? "",
      ticket.key ?? "",
      ticket.summary ?? "",
      ticket.projectName ?? "",
      ticket.description ?? "",
      new Date(ticket.resolutionDate) ?? "",
      ticket.reporterName ?? "",
      ticket.assigneeName ?? ""
    ));
  }
}
