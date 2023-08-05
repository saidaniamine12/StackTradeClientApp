import { Injectable } from '@angular/core';
import {Observable, shareReplay, tap} from "rxjs";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService:AuthService,
              ) { }

  getCurrentUser(): Observable<any> {
    //add withCredentials: true to the request options

    return this.http.get<any>('https://localhost:8443/user/current');
      // .pipe(
      //   tap({
      //     next: ({ user }) => this.authService.setAuth(user),
      //     error: () => this.authService.purgeAuth(),
      //   }),
      //   shareReplay(1),
      // );
  }
}
