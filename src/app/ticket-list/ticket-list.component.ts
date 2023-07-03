import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TicketListItem} from "../models/TicketListItem";
import {User} from "../models/User";
import {tick} from "@angular/core/testing";
import {SearchService} from "../services/search/search.service";
import {FormControl} from "@angular/forms";

// Define a Question class


// @ts-ignore
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnDestroy, OnInit, OnChanges {
  ticketList: TicketListItem[] = [];
  private _pageNumber: number = 1;
  ticketsPerPage: number = 23;
  totalItems: number = 10;



  constructor(private searchService: SearchService) {
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(value: number) {
    this._pageNumber = value;
    //get the list of tickets from the search service
    this.searchService.fetchLatestTickets(this.pageNumber, this.ticketsPerPage).subscribe(
      response => {
        // Handle the search response from the backend
        const totalHits = response.totalHits;
        this.totalItems = response.totalHits;
        this.ticketList = response.searchEntities;
      }
    )
  }

  ngOnInit() {
    //get the list of tickets from the search service
    this.searchService.fetchLatestTickets(this.pageNumber, this.ticketsPerPage).subscribe(
      response => {
        // Handle the search response from the backend
        const totalHits = response.totalHits;
          this.totalItems = response.totalHits;
          this.ticketList = response.searchEntities;
      }
    )

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.pageNumber){
      console.log('page number changed');
      console.log(changes[this.pageNumber]);
    }

  }

  onPageChange(changes: MouseEvent): void {

    console.log('MouseEvent event:', changes);
    console.log('New page number:', this.pageNumber);
    console.log('New page number:', this.ticketsPerPage);
  }

  ngOnDestroy() {
  }



  get maxPages(): number {
    return 7;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Call the method to update the div width on window resize
    this.updateDivWidth();
  }

  getWindowWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  updateDivWidth(): void {
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.style.width = this.getWindowWidth()-55 + 'px';
    }
  }

  protected readonly tick = tick;


}
