import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user-service/user.service";
import {Observable} from "rxjs";


interface onInit {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements onInit {
  returnUrl: string = '';
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,

  ) {
  }

  ngOnInit(): void {

  }
}
