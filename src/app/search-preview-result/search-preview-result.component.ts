import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";
import {NgxSpinnerService} from "ngx-spinner";
import {async} from "rxjs";
import {ActiveLinkService} from "../shared/active-link/active-link.service";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

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
  latestViewedTickets: boolean = false;
  localStorageIdArray: string[] = [];

  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private spinner: NgxSpinnerService,
              private activeLinkService: ActiveLinkService,
              private localStorageService: LocalStorageService) {
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
   this.latestViewedTickets = false;
    this.activeLinkService.setActiveState('latestViewedTickets', false);
  }

  //update the data when the page number changes
  updateData(): void {
    this.ticketList = [];
    this.spinner.show();
    this.localStorageIdArray = this.localStorageService.getTicketFromLocalStorage();
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
    this.activeLinkService.setActiveState('latestViewedTickets', false);
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


}
