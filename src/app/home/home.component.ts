import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../services/user-service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {User} from "../models/User";
import {ActiveLinkService} from "../shared/active-link/active-link.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private activeLinkService: ActiveLinkService,
              private cdref: ChangeDetectorRef) {
  }
  currentUser$ = this.authService.currentUser;
  ngOnInit(): void {
    this.activeLinkService.setActiveState('home', true);

  }


  refresh() {
    this.authService.refresh().subscribe(
      (response:any) => {
        AuthService.accessToken = response.accessToken;
      }
    );
  }

  ngOnDestroy(): void {
    this.activeLinkService.setActiveState('home', false);
  }



}
