import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import your components for routing
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {SearchPreviewResultComponent} from "./search-preview-result/search-preview-result.component";
import {TicketComponent} from "./ticket/ticket.component";
import {authGuard} from "./auth/auth-guard/auth.guard";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
// Define your routes
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent ,canActivate: [authGuard]},
  { path: 'search', component: SearchPreviewResultComponent },
  { path: 'home', component: HomeComponent},
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/:id', component: TicketComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
