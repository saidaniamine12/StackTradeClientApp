import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {User} from "../models/User";
import {tick} from "@angular/core/testing";
import {SearchService} from "../services/search/search.service";
import {FormControl} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {ActiveLinkService} from "../shared/active-link/active-link.service";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

// Define a Question class


// @ts-ignore
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnDestroy, OnInit {
  ticketList: Ticket[] = [];
  ticketsPerPage: number = 10;
  localStorageIdArray: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
    private activeLinkService: ActiveLinkService,
    private localStorageService: LocalStorageService
    ) {
  }

  changePageSize(size: number) {
    this.ticketsPerPage = size;
    // Fetch data based on the new page size
    console.log('New page size:', this.ticketsPerPage);
    this.updateData();
  }


  ngOnInit() {
    //get the list of tickets from the search service
    this.updateData();

  }

  //update the data when the page number changes
  updateData(): void {
    this.spinner.show();
    this.searchService.fetchLatestSolvedTickets(this.ticketsPerPage)
      .subscribe(
        response => {
          this.ticketList = response;
          this.spinner.hide();
        },
        error => {
          console.log("error");
          console.log(error);
          this.spinner.hide();
        });
    document.documentElement.scrollTop = 0;
    return ;
  }

  openTicketInJiraServer(key: string, id: string) {
    const linkUrl = 'https://jira.spring.io/browse/' + key;
    window.open(linkUrl, '_blank');
    this.searchService.saveLatestViewedTicket(id).subscribe(
      response => {
      },
      error => {
        console.log("error");
        console.log(error);
      }
    )
    this.localStorageService.addTicketToLocalStorage(id);
  }


  ngOnDestroy() {
    this.activeLinkService.setActiveState('home', false);
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



}
