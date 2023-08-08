import {Component, HostListener, OnInit} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";
import {NgxSpinnerService} from "ngx-spinner";
import {async} from "rxjs";

@Component({
  selector: 'app-search-preview-result',
  templateUrl: './search-preview-result.component.html',
  styleUrls: ['./search-preview-result.component.css']
})
export class SearchPreviewResultComponent implements OnInit{
  //get the list of tickets from the search service
  ticketList:Ticket[] = [];
  ticketsPerPage: number = 10;
  searchQuery: string = '';
  selectedField: string = 'All';
  isLoading: boolean = false;


  constructor(private route: ActivatedRoute,
              private searchService: SearchService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] ? params['query'] : '';
      this.selectedField = params['selectedField'] ? params['selectedField'] : 'All';
      if(this.searchQuery === '') {
        return;
      } else {
        this.updateData();
      }
    });
  }

  //update the data when the page number changes
  updateData(): void {
    this.ticketList = [];
    this.spinner.show();
    this.searchService.fetchTextSearch(this.searchQuery,this.selectedField, this.ticketsPerPage)
      .subscribe(

        response => {
          console.log("response");
          console.log(response);
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

  protected readonly async = async;
}
