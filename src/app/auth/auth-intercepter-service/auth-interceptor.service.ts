import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  refresh= false;

  constructor(private http:HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted')
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthService.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('req')
    console.log(req)
    console.log(AuthService.accessToken);
    console.log('req end')
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      console.log('error' + err.status)
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;
        return this.http.post('https://localhost:8443/api/auth/refresh', {}, {withCredentials: true}).pipe(
          switchMap((res: any) => {
            AuthService.accessToken = res.token;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthService.accessToken}`
              }
            }));
          })
        );
      }
      console.log('error end of line ')
      this.refresh = false;
      return throwError(() => err);
    }));
  }
}
