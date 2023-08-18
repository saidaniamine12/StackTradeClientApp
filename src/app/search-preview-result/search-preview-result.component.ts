import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";
import {NgxSpinnerService} from "ngx-spinner";
import {async} from "rxjs";
import {ActiveLinkService} from "../shared/active-link/active-link.service";

@Component({
  selector: 'app-search-preview-result',
  templateUrl: './search-preview-result.component.html',
  styleUrls: ['./search-preview-result.component.css']
})
export class SearchPreviewResultComponent implements OnInit, OnDestroy {
  //get the list of tickets from the search service
  ticketList: Ticket[] = [];
  ticketsPerPage: number = 10;
  searchQuery: string = '';
  selectedField: string = 'All';
  isLoading: boolean = false;
  numberOfLatestViewedTickets: number = 50;
  latestViewedTickets: boolean = false;
  localStorageIdArray: string[] = [];

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private spinner: NgxSpinnerService,
              private activeLinkService: ActiveLinkService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] ? params['query'] : '';
      this.selectedField = params['selectedField'] ? params['selectedField'] : 'All';
      this.latestViewedTickets = params['latestViewedTickets'] ? params['latestViewedTickets'] : false;
      this.updateData();
    });
  }

  ngOnDestroy() {
    console.log("destroy");
   this.latestViewedTickets = false;
    this.activeLinkService.setActiveState('latestViewedTickets', false);
  }

  //update the data when the page number changes
  updateData(): void {
    this.ticketList = [];
    this.spinner.show();
    this.getTicketFromLocalStorage();
    if (this.latestViewedTickets) {
      this.searchService.fetchLatestViewedTickets(this.ticketsPerPage)
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
      return;
    }
    if (this.searchQuery === '') {
      return;
    }
    this.searchService.fetchTextSearch(this.searchQuery, this.selectedField, this.ticketsPerPage)
      .subscribe(
        response => {
          this.ticketList = response;
          this.spinner.hide();
        },
        error => {
          console.log("error");
          console.log(error);

        }
      );
    document.documentElement.scrollTop = 0;
  }


  changePageSize(size: number) {
    this.ticketsPerPage = size;
    this.updateData();
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
      contentDiv.style.width = this.getWindowWidth() - 55 + 'px';
    }
  }

  protected readonly async = async;

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
    this.addTicketToLocalStorage(id);
  }

  addTicketToLocalStorage(ticket_id: string) {
    const ticket_idsJSON = localStorage.getItem('ticket_ids');
    let ticket_ids_array;
    let ticket_ids_set;
    if (ticket_idsJSON !== null && ticket_idsJSON !== undefined && ticket_idsJSON !== '{}') {
      ticket_ids_array = JSON.parse(ticket_idsJSON);
      ticket_ids_set = new Set(ticket_ids_array);
    } else {
      ticket_ids_set = new Set();
    }
    // Add the new ticket_id to the Set
    ticket_ids_set.add(ticket_id);
    ticket_ids_array = Array.from(ticket_ids_set);
    localStorage.setItem('ticket_ids', JSON.stringify(ticket_ids_array));

  }

  getTicketFromLocalStorage() : void {
    const ticket_idsJSON = localStorage.getItem('ticket_ids');
    let ticket_ids_array;
    if (ticket_idsJSON !== null && ticket_idsJSON !== undefined && ticket_idsJSON !== '{}') {
      ticket_ids_array = JSON.parse(ticket_idsJSON);
      this.localStorageIdArray = ticket_ids_array;
    }

  }
}
