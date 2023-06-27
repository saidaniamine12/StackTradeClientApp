import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { SearchPreviewResultComponent } from './search-preview-result/search-preview-result.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { FooterComponent } from './footer/footer.component';
import {MaxLengthPipe} from "./pipes/max-length.pipe";

import { SearchService } from './services/search/search.service';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http"; // Import the SearchService
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    MenuPanelComponent,
    SearchPreviewResultComponent,
    TicketComponent,
    TicketListComponent,
    FooterComponent,
    MaxLengthPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SearchService // Add the SearchService to the providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
