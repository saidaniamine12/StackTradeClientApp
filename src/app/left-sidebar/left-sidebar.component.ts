import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SearchService} from "../services/search/search.service";
import {Router} from "@angular/router";
import {SearchPreviewResultComponent} from "../search-preview-result/search-preview-result.component";
import {ActiveLinkService} from "../shared/active-link/active-link.service";

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {

  selectedLatestViewed: boolean = false; // Initially set to false

  constructor(
    private searchService: SearchService,
    private router: Router,
    protected activeLinkService: ActiveLinkService
  ) {
  }

  getLatestViewedTickets() {
    console.log("getLatestViewedTickets");
    this.activeLinkService.setActiveState('latestViewedTickets', true);
    this.router.navigate(['/search'], {
      queryParams: {
        latestViewedTickets: true
      }
    });



  }


  toggleSelection() {
    this.selectedLatestViewed = !this.selectedLatestViewed;
    // Perform other actions here if needed
  }

  protected readonly SearchPreviewResultComponent = SearchPreviewResultComponent;

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
}
