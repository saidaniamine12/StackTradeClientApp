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
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptorService.accessToken}`
      }
    });
    console.log(AuthInterceptorService.accessToken);
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !this.refresh) {
        this.refresh = true;
        return this.http.post('https://localhost:8443/api/auth/refresh', {}, {withCredentials: true}).pipe(
          switchMap((res: any) => {
            AuthInterceptorService.accessToken = res.token;
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
