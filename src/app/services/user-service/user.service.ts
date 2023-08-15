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

  private baseUrl = 'https://localhost:8443';

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService
              ) { }

  getCurrentUser(): Observable<any> {
    const url = `${this.baseUrl}/user/current`;
    return this.http.get<any>(url, {withCredentials: true})
      .pipe(
        tap({
          next: ({ user}) => this.authService.setAuth(user),
          error: () => this.authService.purgeAuth(),
        }),
        shareReplay(1),
      );
  }

  updateUserInfo(updatedUser: any): Observable<any> {
    const url = `${this.baseUrl}/user/update`;
    return this.http.post<any>(url, updatedUser,{withCredentials: true})
  }


}
