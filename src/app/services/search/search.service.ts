import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TicketListItem} from "../../models/TicketListItem";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    console.log('searching..... + '+query);
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.http.get(url);
  }
}
