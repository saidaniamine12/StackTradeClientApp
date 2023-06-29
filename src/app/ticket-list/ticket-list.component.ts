import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {TicketListItem} from "../models/TicketListItem";
import {User} from "../models/User";
import {tick} from "@angular/core/testing";
import {SearchService} from "../services/search/search.service";

// Define a Question class


// @ts-ignore
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnDestroy, OnInit {
  ticketList: TicketListItem[] = [];


  constructor(private searchService: SearchService) {
  }



  ngOnInit() {
    //get the list of tickets from the search service
    this.searchService.getLatestTickets().subscribe(
      response => {
        // Handle the search response from the backend
        console.log('returned response');
        console.log(response);
        if (response) {
          this.ticketList = TicketListItem.mapResponseToTicketList(response);
          console.log(this.ticketList);
        }
      }
    )

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

  protected readonly tick = tick;
}
