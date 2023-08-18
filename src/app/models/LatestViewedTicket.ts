import {Ticket} from "./Ticket";

export class LatestViewedTicket {
  constructor(
    public ticketId:string ,
    public viewedAt: Date,
  ) {}
}
