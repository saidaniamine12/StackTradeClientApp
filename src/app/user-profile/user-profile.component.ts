import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../services/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{


  changeProfileImg: boolean = false;
  imgUrlWarn: boolean = false;

  deleteProfile: boolean = false;
  passwordWarn: boolean = false;
  editUserInfoMode: boolean = false;
  editProfileForm: FormGroup = this.fb.group({
  });

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private fb: FormBuilder
  ) {
  }

  currentUser$ = this.authService.currentUser;
  private inputPassword: string = "";
  ngOnInit(): void {
    console.log("user profile component");

  }



  toggleChangeProfileImg() {
    this.changeProfileImg = !this.changeProfileImg;
    this.imgUrlWarn = false;
  };

  toggleDeleteProfile() {
    this.deleteProfile = !this.deleteProfile;
    this.passwordWarn = false;
  };



  hideImgUrlWarn() {
    this.imgUrlWarn = false;
  };

  hidePasswordWarn() {
    this.passwordWarn = false;
  };

  postDeleteProfile(inputPassword: HTMLInputElement) {
    /* Activate deleteProfile menu */
    if (!this.deleteProfile) {
      this.toggleDeleteProfile();
      return;
    }

    /* Get info from deleteProfile menu and post it to server */
    if(inputPassword.value.length < 4) {
      this.passwordWarn = true;
      return;
    }


  };

  saveInfoChanges() {
    const updatedInfo = {
      name: this.editProfileForm.value.name,
      companyName: this.editProfileForm.value.companyName,
      location: this.editProfileForm.value.location
    }
    console.log('updated info', updatedInfo);
    this.userService.updateUserInfo(updatedInfo).subscribe(
      user => {
        console.log('updated user', user)
        this.authService.setAuth(user);
        this.currentUser$ = this.authService.currentUser;
      }
    )
    this.editUserInfoMode = false;
  }

  cancelInfoChanges() {
    this.editUserInfoMode = false;
  }

  editInfo() {

    this.currentUser$.subscribe(user => {
      if (user != null) {
        this.editProfileForm = this.fb.group({
          name: [user.name], // Use the user's name as the default value
          companyName : [user.companyName],
          location : [user.location]
        });
      }
    });


    this.editUserInfoMode = true;
  }





}
