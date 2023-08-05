import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, distinctUntilChanged, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {AuthInterceptorService} from "./auth-intercepter-service/auth-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:8443/api/auth'; // Replace with your actual API URL
  private currentUserSubject = new BehaviorSubject<User |null> (null);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  isAuthenticated = this.currentUser.pipe(map(user => !!user));
  constructor(private http: HttpClient,
              private router: Router) {
  }





  // store the URL so we can redirect after logging in
  private redirectUrl: string | null = null;

  login(formData: any): Observable<any> {
    const url = `${this.apiUrl}/authenticate`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Create the options withCredentials set to true
    const options = { headers, withCredentials: true };
    return this.http.post(url, formData , options);
  }

  registerUser(formData:any): Observable<any> {
    const url = `${this.apiUrl}/register`;

    return this.http.post(url, formData);

  }

  logout(): void {
    const url = `${this.apiUrl}/logout`;
    this.http.post(url, {},{withCredentials:true}).subscribe(
      () => {
        this.router.navigate(['/login']);
      }
    );
  }


  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  setAuth(user: User): void {
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    AuthInterceptorService.accessToken = '';
    this.currentUserSubject.next(null);
  }
}
