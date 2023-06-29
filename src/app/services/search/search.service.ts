import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketListItem} from "../../models/TicketListItem";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8080/tickets';

  constructor(private http: HttpClient) {}

  textSearch(query: string): Observable<any> {
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.http.get(url);
  }
  //get the list of tickets from the search service
  getLatestTickets(): Observable<any> {
    const url = `${this.baseUrl}/latest`;
    return this.http.get(url);
  }
}
