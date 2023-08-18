import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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

import { SearchService } from './services/search/search.service';// Import the SearchService
import  {NgxPaginationModule} from 'ngx-pagination'; // Import the  ngx-pagination module
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthService} from "./auth/auth.service";
import {AuthInterceptorService} from "./auth/auth-intercepter-service/auth-interceptor.service";
import {UserService} from "./services/user-service/user.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner-component";
import {NgxSpinnerModule} from "ngx-spinner";
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { SetActiveDirective } from './shared/directives/set-active/set-active.directive';
import {ActiveLinkService} from "./shared/active-link/active-link.service";


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
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    LoadingSpinnerComponent,
    LeftSidebarComponent,
    SetActiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgxSpinnerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    SearchService,
    ActiveLinkService,
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
