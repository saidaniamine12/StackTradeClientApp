import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../services/user-service/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{


  private newImgUrl: string = "";

  changeProfileImg: boolean = false;
  imgUrlWarn: boolean = false;

  deleteProfile: boolean = false;
  passwordWarn: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService
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

  postNewProfileImg(inputImgUrl: HTMLInputElement) {
    this.newImgUrl = inputImgUrl.value;

    if (this.newImgUrl.length < 6) {
      this.imgUrlWarn = true;
      return;
    }

    this.userService.postImgUrl(this.newImgUrl).subscribe(
      res => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.user));
      },
      error => {
        console.log(error);
      }
    );

    this.toggleChangeProfileImg();
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

    this.userService.postDeleteUser().subscribe(
      res => {
        if (res.status == 200)
          this.authService.logout();
        else
          this.passwordWarn = true;
      },
      error => {
        console.log(error);
      }
    );
  };

}
