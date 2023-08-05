import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  message: string = "";
  passwordMatch: boolean= false;

  constructor(public authService: AuthService,
              public router: Router,
              private formBuilder: FormBuilder) {
  }

  signupForm : FormGroup= this.formBuilder.group({
    name: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15)])],
    email: ['',Validators.compose([Validators.required,Validators.email])],
    password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
    confirmPassword: ['',Validators.compose([Validators.required,Validators.minLength(6)])]
  },
    { validators: this.passwordMatchValidator });


  passwordMatchValidator(control: AbstractControl):  ValidationErrors | null {
    const password: string = control.value.password; // get password from our password form control
    const confirmPassword: string = control.value.confirmPassword; // get password from our confirmPassword form control

    // if the confirmPassword value is null or empty, don't return an error.
    if (!confirmPassword?.length) {
      return null;
    } else {
      // compare the passwords and see if they match.
      if (password !== confirmPassword) {
        // @ts-ignore
        control.get('confirmPassword').setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        // if passwords match, don't return an error.
        return null;
      }
    }
  }

  //create a register function
  onSignupSubmit(): void {
    console.log("signing up...")
    if (this.signupForm.valid) {
      const formData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      this.authService.registerUser(formData)
        .subscribe(
          response => {
            console.log('Registration successful:', response);
            // Redirect to a different page or show a success message
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Registration failed:', error);
            // Handle registration error, show error message, etc.
          }
        );
    }
  }




}
