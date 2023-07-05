import {TicketListItem} from "./TicketListItem";

export class SearchResponse {
  constructor(
    public searchEntities: TicketListItem[],
    public totalHits: number,
  ) {}
}
