import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user-service/user.service";


interface onInit {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements onInit {
  returnUrl: string = '';


  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,

  ) {
  }

  ngOnInit(): void {

  }
}
