import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {User} from "../models/User";
import {tick} from "@angular/core/testing";
import {SearchService} from "../services/search/search.service";
import {FormControl} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveLinkService} from "../shared/active-link/active-link.service";
import {LocalStorageService} from "../services/local-storage/local-storage.service";
import {JiraServerTicket} from "../models/jira-server-extracted-tickets/JiraServerTicket";

// Define a Question class


// @ts-ignore
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnDestroy, OnInit {
  ticketList: JiraServerTicket[] | any[] = [];
  ticketsPerPage: number = 10;
  localStorageIdArray: string[] = [];

  constructor(
    private route: Router,
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
    private activeLinkService: ActiveLinkService,
    private localStorageService: LocalStorageService
    ) {
  }

  changePageSize(size: number) {
    this.ticketsPerPage = size;
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


  protected readonly tick = tick;

  openTicketDetails(key: string, id: string) {
    this.searchService.saveLatestViewedTicket(id).subscribe(
      response => {
      },
      error => {
        console.log("error");
        console.log(error);
      }
    )
    this.localStorageService.addTicketToLocalStorage(id);
    this.route.navigate(['/tickets/' + id]);
  }
}
