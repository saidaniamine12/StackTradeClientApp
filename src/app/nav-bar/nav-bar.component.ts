import {Component, HostListener, Input} from '@angular/core';
import { SearchService } from '../services/search/search.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() searchQuery: string = '';


  constructor(
    private searchService: SearchService,
    private router: Router) { }

  search(): void {
    console.log(this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });

  }

  ngOnInit(): void {
  }






}
