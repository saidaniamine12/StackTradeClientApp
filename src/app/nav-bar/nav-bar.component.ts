import {Component, Input, ViewEncapsulation} from '@angular/core';
import {SearchService} from '../services/search/search.service';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {filter, map, Observable, startWith} from "rxjs";


const Fields = {
  All: "All",
  Summary:"Summary",
  Description:"Description"
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class NavBarComponent {
  @Input() searchQuery: string = '';
  selectedField: string = Fields.All;
  isValidInput: boolean = false;
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated;
  currentUser$ = this.authService.currentUser;

  readonly showShowLogin$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => this.canShowLogin((event as NavigationEnd).urlAfterRedirects)),
    startWith(this.canShowLogin(this.router.url))
  );



  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService:AuthService) { }

  canShowLogin(url: string): boolean {
    return ['/signup'].every((path) => !url.startsWith(path) );
  }



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

  loadUserProfile(id: number) {
    console.log("load user profile")
    this.router.navigate(['user/'+id]);
  }
}
