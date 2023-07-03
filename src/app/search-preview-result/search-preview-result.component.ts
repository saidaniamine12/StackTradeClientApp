import {Component, HostListener, OnInit} from '@angular/core';
import {TicketListItem} from "../models/TicketListItem";
import {User} from "../models/User";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";

@Component({
  selector: 'app-search-preview-result',
  templateUrl: './search-preview-result.component.html',
  styleUrls: ['./search-preview-result.component.css']
})
export class SearchPreviewResultComponent implements OnInit{
  //get the list of tickets from the search service
  ticketList: TicketListItem[] = [];
  private _pageNumber: number = 1;
  ticketsPerPage: number = 23;
  totalItems: number = 10;


  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchService.textSearch(params['query'])
        .subscribe(
          response => {
            // Handle the search response from the backend
            console.log(response);
            if (response) {
              this.ticketList = TicketListItem.mapResponseToTicketList(response);
              console.log(this.ticketList);
            }
          },
          error => {
            // Handle the error
            console.error(error);
          }
        );
    });
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(value: number) {
    this._pageNumber = value;
    this.searchService.getLatestTickets(this._pageNumber, this.ticketsPerPage).subscribe(
      response => {
        // Handle the search response from the backend
        console.log('returned response');
        console.log(response);
        const searchEntities = response.searchEntities;
        const totalHits = response.totalHits;

        if(totalHits !== undefined && totalHits !== null && totalHits > 0){
          this.totalItems = totalHits;
        }

        if (searchEntities !==undefined && searchEntities !== null && searchEntities.length > 0 ) {
          this.ticketList = TicketListItem.mapResponseToTicketList(searchEntities);
        }

      }
    )
  }

  get maxPages(): number {
    return 7;
  }

  ngOnDestroy() {
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
}
