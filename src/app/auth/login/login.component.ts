import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder} from "@angular/forms";
import {AuthInterceptorService} from "../auth-intercepter-service/auth-interceptor.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  message: string;

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });



  constructor(public authService: AuthService,
              public router: Router,
              private formBuilder: FormBuilder) {
    this.message = this.getMessage();
  }

  ngOnInit(): void {
    console.log("login component");
  }


  getMessage(): string {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');

  }

  onLoginSubmit() {
    this.message = 'Trying to log in ...';
    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(formData);
    this.authService.login(formData).subscribe(
      response => {
        AuthInterceptorService.accessToken = response.accessToken;
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed:', error);
        // Handle login error, show error message, etc.
      }
    );
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }




}
