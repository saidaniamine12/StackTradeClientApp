import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });



  constructor(public authService: AuthService,
              public router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    console.log("login component");
  }



  onLoginSubmit() {
    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(formData);
    this.authService.login(formData).subscribe(
      response => {
        console.log('Login successful:', response)
        AuthInterceptorService.accessToken = response.accessToken;
        this.userService.getCurrentUser().subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/home']);
          });

      },
      error => {
        console.error('Login failed:', error);
        // Handle login error, show error message, etc.
      }
    );
  }

  logout() {
    this.authService.logout();
  }




}
