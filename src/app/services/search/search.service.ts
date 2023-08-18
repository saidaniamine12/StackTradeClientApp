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
  getLatestSolvedTickets(ticketsPerPage: number): Observable<Ticket[]> {
      const params = new HttpParams()
        .set('ticketsPerPage', ticketsPerPage.toString());
      const url = `${this.baseUrl}/latest`;
    return this.http.get(url, {params}) as Observable<Ticket[]>;
  }



  // @ts-ignore
  fetchLatestSolvedTickets(ticketsPerPage: number): Observable<Ticket[] | any[]> {
    return this.getLatestSolvedTickets(ticketsPerPage).pipe(
      map(response => {
        const searchEntities = response;

          if (searchEntities !== undefined && searchEntities !== null && searchEntities.length > 0) {
            return Ticket.mapResponseToTicketList(searchEntities) ;
          }

        // Return an empty response if no tickets are found
        return [];
      })
    );
  }


  getLatestViewedTickets(ticketsPerPage: number): Observable<Ticket[]> {
    const params = new HttpParams()
      .set('ticketsPerPage', ticketsPerPage.toString());
    const url = `${this.baseUrl}/latestViewedTickets`;
    return this.http.get(url, {params}) as Observable<Ticket[]>;
  }

  fetchLatestViewedTickets(ticketsPerPage: number): Observable<Ticket[]> {
    return this.getLatestViewedTickets(ticketsPerPage).pipe(
      map(response => {
        const searchEntities = response;
        if (searchEntities !== undefined && searchEntities !== null && searchEntities.length > 0) {
          return Ticket.mapResponseToTicketList(searchEntities);
        }

        // Return an empty response if no tickets are found
        return [];
      })
    );
  }

  saveLatestViewedTicket(ticket_id:string) {
    const url = this.baseUrl + '/latestViewedTicket/save';
    return this.http.post(url,ticket_id);
  }
}
