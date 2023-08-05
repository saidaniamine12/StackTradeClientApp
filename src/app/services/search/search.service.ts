import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Ticket} from "../../models/Ticket";
import {SearchResponse} from "../../models/SearchResponse";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'https://localhost:8443/tickets';

  constructor(private http: HttpClient) {}


  //get ticket by id
  getTicketById(id: string): Observable<Ticket> {
    const url = `${this.baseUrl}/ticket/${id}`;
    return this.http.get(url) as Observable<Ticket>;
  }

  textSearch(query: string,selectedField: string, ticketsPerPage: number): Observable<Ticket[]> {
    const params = new HttpParams()
      .set('ticketsPerPage', ticketsPerPage.toString())
      .set('selectedField', selectedField);
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.http.get(url, {params}) as Observable<Ticket[]>;
  }


  fetchTextSearch(query: string,selectedField: string, ticketsPerPage: number): Observable<Ticket[]> {
    return this.textSearch(query,selectedField, ticketsPerPage).pipe(
      map(response => {
        const searchEntities = response;
          if (searchEntities !== undefined && searchEntities !== null  && searchEntities.length > 0) {
            return Ticket.mapResponseToTicketList(searchEntities);
          }

        // Return an empty response if no tickets are found
        return  searchEntities;
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
    searchEntities: Ticket[];
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
            const ticketList = Ticket.mapResponseToTicketList(searchEntities);
            return { searchEntities: ticketList, totalHits: totalHits };
          }
        }

        // Return an empty response if no tickets are found
        return { searchEntities: [], totalHits: 0 };
      })
    );
  }

}
