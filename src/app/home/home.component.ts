import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../services/user-service/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService) {
  }
  currentUser$ = this.authService.currentUser;
  ngOnInit(): void {
    console.log("home component");


  }

  logout() {
    this.authService.logout();
  }

  refresh() {
    this.authService.refresh().subscribe(
      (response:any) => {
        AuthService.accessToken = response.accessToken;
      }
    );
  }
}
