import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {SearchPreviewResultComponent} from "./search-preview-result/search-preview-result.component";

// Define your routes
const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchPreviewResultComponent },

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
