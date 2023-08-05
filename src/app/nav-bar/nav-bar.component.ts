import {Component, Input} from '@angular/core';
import { SearchService } from '../services/search/search.service';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";


const Fields = {
  All: "All",
  Summary:"Summary",
  Description:"Description"
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  @Input() searchQuery: string = '';
  selectedField: string = Fields.All;
  isValidInput: boolean = false;


  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService:AuthService) { }

  search(): void {
    console.log(this.searchQuery);
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchQuery,
        selectedField: this.selectedField
      }
    }).then(r => console.log(r));
    console.log(this.selectedField);

  }

  searchField(field: string) {
    this.selectedField = this.selectedField === field ? Fields.All : field;
    console.log(this.selectedField);
    this.search();
  }



  updateButtonState() {
    this.isValidInput = this.searchQuery.trim() !== '';
  }

  logout() {
    this.authService.logout();
  }


  protected readonly Fields = Fields;

}
