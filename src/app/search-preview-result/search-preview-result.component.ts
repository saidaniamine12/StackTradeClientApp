import {Component, HostListener, OnInit} from '@angular/core';
import {Ticket} from "../models/Ticket";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search/search.service";

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

  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.selectedField = params['selectedField'];
      this.updateData();
    });
  }

  //update the data when the page number changes
  updateData(): void {
    this.searchService.fetchTextSearch(this.searchQuery,this.selectedField, this.ticketsPerPage)
      .subscribe(
        response => {
          this.ticketList = response;
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
}
