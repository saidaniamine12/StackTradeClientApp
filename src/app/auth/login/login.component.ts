import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder} from "@angular/forms";
import {AuthInterceptorService} from "../auth-intercepter-service/auth-interceptor.service";
import {UserService} from "../../services/user-service/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  returnUrl: string ='';

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });



  constructor(public authService: AuthService,
              public router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private activedRoute: ActivatedRoute) {
    this.returnUrl = this.activedRoute.snapshot.queryParams['returnUrl'] || '/home';
  }

  ngOnInit(): void {


  }



  onLoginSubmit() {
    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(formData);
    this.authService.login(formData).subscribe(
      response => {
        AuthService.accessToken = response.accessToken;
        this.userService.getCurrentUser().subscribe(
          response => {
            this.authService.setAuth(response);
            this.router.navigate(['/home']);
          });

      },
      error => {
        console.error('Login failed:', error);
        this.authService.purgeAuth();
      }
    );
  }

  logout() {
    this.authService.logout();
  }




}
