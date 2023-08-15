import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, delay, distinctUntilChanged, map, Observable, of, shareReplay, tap} from "rxjs";
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
  static accessToken: string =  '';
  constructor(private http: HttpClient,
              private router: Router) {
  }





  // store the URL so we can redirect after logging in
  private redirectUrl: string | null = null;
  login(formData: any): Observable<any> {
    const url = `${this.apiUrl}/authenticate`;

    return this.http.post<any>(url, formData).pipe(
      tap(response => {
        AuthService.accessToken = response.token;

      }),
      catchError(error => {
        console.log(error);
        throw error;
      }),
      shareReplay(1)
    );
  }

  registerUser(formData:any): Observable<any> {
    const url = `${this.apiUrl}/register`;

    return this.http.post(url, formData);

  }

  logout(): void {
    const url = `${this.apiUrl}/logout`;
    this.http.post(url, {}).subscribe(
      (response) => {
        this.purgeAuth();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log("err",error);
        this.purgeAuth();
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
    AuthService.accessToken = '';
    this.currentUserSubject.next(null);
  }

  refresh(): Observable<any>   {


    const url = `${this.apiUrl}/refresh`;
    return this.http.post(url, {}, {withCredentials: true});
  }

}
