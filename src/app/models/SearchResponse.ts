import {Ticket} from "./Ticket";

export class SearchResponse {
  constructor(
    public searchEntities: Ticket[],
    public totalHits: number,
  ) {}
}
