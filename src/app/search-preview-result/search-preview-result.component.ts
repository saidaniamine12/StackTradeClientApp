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


  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchService.textSearch(params['query'])
        .subscribe(
          response => {
            // Handle the search response from the backend
            console.log('im here');
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
