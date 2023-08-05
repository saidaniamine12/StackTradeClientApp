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

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  static accessToken = '';
  refresh= false;

  constructor(private http:HttpClient) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercepted request');
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptorService.accessToken}`
      }
    });
    console.log('resuest ...')
    console.log(req)
    console.log("access token after inctercepted ");
    console.log(AuthInterceptorService.accessToken);
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      console.log(err.status);
      console.log('error');
      console.log(err);
      console.log(err.error);
      if (err.status === 403 && !this.refresh) {
        this.refresh = true;
        console.log('rstatus')
        console.log(err.status)
        return this.http.post('https://localhost:8443/api/auth/refresh', {}, {withCredentials: true}).pipe(
          switchMap((res: any) => {
            console.log('refreshed')
            AuthInterceptorService.accessToken = res.token;
            console.log('access token after refresh')
            console.log(AuthInterceptorService.accessToken)
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthInterceptorService.accessToken}`
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
