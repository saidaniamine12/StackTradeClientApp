import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Ticket} from "../../models/Ticket";
import {SearchResponse} from "../../models/SearchResponse";
import {JiraServerTicket} from "../../models/jira-server-extracted-tickets/JiraServerTicket";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'https://localhost:8443/tickets';


  constructor(private http: HttpClient) {}


  //get ticket by id
  getTicketById(id: string): Observable<JiraServerTicket> {
    const url = `${this.baseUrl}/ticket/${id}`;
    return this.http.get(url) as Observable<JiraServerTicket>;
  }

  textSearch(query: string,selectedField: string, ticketsPerPage: number): Observable<JiraServerTicket[]> {
    const params = new HttpParams()
      .set('ticketsPerPage', ticketsPerPage.toString())
      .set('selectedField', selectedField);
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.http.get(url, {params}) as Observable<JiraServerTicket[]>;
  }


  fetchTextSearch(query: string,selectedField: string, ticketsPerPage: number): Observable<JiraServerTicket[]> {
    return this.textSearch(query,selectedField, ticketsPerPage).pipe(
      map(response => {
        const searchEntities = response;
          if (searchEntities !== undefined && searchEntities !== null  && searchEntities.length > 0) {
            return response;
          }

        // Return an empty response if no tickets are found
        return  searchEntities;
      })
    );
  }


  //get the list of tickets from the search service
  getLatestSolvedTickets(ticketsPerPage: number): Observable<JiraServerTicket[]> {
      const params = new HttpParams()
        .set('ticketsPerPage', ticketsPerPage.toString());
      const url = `${this.baseUrl}/latest`;
    return this.http.get(url, {params}) as Observable<JiraServerTicket[]>;
  }



  // @ts-ignore
  fetchLatestSolvedTickets(ticketsPerPage: number): Observable<JiraServerTicket[] | any[]> {
    return this.getLatestSolvedTickets(ticketsPerPage).pipe(
      map(response => {
        const searchEntities = response;

          if (searchEntities !== undefined && searchEntities !== null && searchEntities.length > 0) {
            return searchEntities
          }
        // Return an empty response if no tickets are found
        return [];
      })
    );
  }


  getLatestViewedTickets(ticketsPerPage: number): Observable<JiraServerTicket[]> {
    const params = new HttpParams()
      .set('ticketsPerPage', ticketsPerPage.toString());
    const url = `${this.baseUrl}/latestViewedTickets`;
    return this.http.get(url, {params}) as Observable<JiraServerTicket[]>;
  }

  fetchLatestViewedTickets(ticketsPerPage: number): Observable<JiraServerTicket[]> {
    return this.getLatestViewedTickets(ticketsPerPage).pipe(
      map(response => {
        const searchEntities = response;
        if (searchEntities !== undefined && searchEntities !== null && searchEntities.length > 0) {
          return response;
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
