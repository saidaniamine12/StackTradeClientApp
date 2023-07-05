import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TicketListItem} from "../../models/TicketListItem";
import {SearchResponse} from "../../models/SearchResponse";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8080/tickets';

  constructor(private http: HttpClient) {}

  textSearch(query: string,pageNumber: number, ticketsPerPage: number): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('ticketsPerPage', ticketsPerPage.toString());
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.http.get(url, {params}) as Observable<SearchResponse>;
  }


  fetchTextSearch(query: string, pageNumber: number, ticketsPerPage: number): Observable<{
    searchEntities: TicketListItem[];
    totalHits: any
  } | { searchEntities: any[]; totalHits: number }> {
    return this.textSearch(query, pageNumber, ticketsPerPage).pipe(
      map(response => {
        console.log('returned response');
        console.log(response);
        const searchEntities = response.searchEntities;
        const totalHits = response.totalHits;

        if (totalHits !== undefined && totalHits !== null && totalHits > 0) {
          if (searchEntities !== undefined && searchEntities !== null && searchEntities.length > 0) {
            const ticketList = TicketListItem.mapResponseToTicketList(searchEntities);
            console.log('ticketList');
            console.log(ticketList);
            return { searchEntities: ticketList, totalHits: totalHits };
          }
        }

        // Return an empty response if no tickets are found
        return { searchEntities: [], totalHits: 0 };
      })
    );
  }


  //get the list of tickets from the search service
  getLatestTickets(pageNumber: number, ticketsPerPage: number): Observable<SearchResponse> {
      const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('ticketsPerPage', ticketsPerPage.toString());
      const url = `${this.baseUrl}/latest`;
    return this.http.get(url, {params}) as Observable<SearchResponse>;
  }



  // @ts-ignore
  fetchLatestTickets(pageNumber: number, ticketsPerPage: number): Observable<{
    searchEntities: TicketListItem[];
    totalHits: any
  } | { searchEntities: any[]; totalHits: number }> {
    return this.getLatestTickets(pageNumber, ticketsPerPage).pipe(
      map(response => {
        console.log('returned response');
        console.log(response);
        const searchEntities = response.searchEntities;
        const totalHits = response.totalHits;

        if (totalHits !== undefined && totalHits !== null && totalHits > 0) {
          if (searchEntities !== undefined && searchEntities !== null && searchEntities.length > 0) {
            const ticketList = TicketListItem.mapResponseToTicketList(searchEntities);
            return { searchEntities: ticketList, totalHits: totalHits };
          }
        }

        // Return an empty response if no tickets are found
        return { searchEntities: [], totalHits: 0 };
      })
    );
  }
}
