import {TicketListItem} from "./TicketListItem";

export class SearchResponse {
  constructor(
    public tickets: TicketListItem[],
    public totalHits: number,
  ) {}
}
