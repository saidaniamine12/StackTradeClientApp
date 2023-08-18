import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  refresh= false;

  constructor(private http:HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthService.accessToken}`,
        'Content-Type': 'application/json',

      }
    });

    const xhr = req.clone({
      withCredentials: true
    });
    return next.handle(xhr).pipe(
      tap(
        (event: HttpEvent<any>) => {
          // Handle successful responses if needed
          if (event instanceof HttpResponse && event.body) {
            if (this.isNotOkResponse(event.body)) {
              const response = event.body;
              if (response.status === 401 && !this.refresh){
                this.refresh = true;
                this.http.post('https://localhost:8443/api/auth/refresh', {}, {withCredentials: true}).pipe(
                  switchMap((res: any) => {
                    AuthService.accessToken = res.accessToken ? res.accessToken : '';
                    return next.handle(xhr.clone({
                      setHeaders: {
                        Authorization: `Bearer ${AuthService.accessToken}`
                      }
                    }));
                  })
                );
              }
            }
          }
        },
        (error: any) => {
              throwError(() => error);
        }
      )
    );
  }


  isNotOkResponse(responseData: any): boolean {
    // Implement your logic to validate the response format
    // For example, check if responseData has the expected properties
    return (
      responseData.path &&
      responseData.error &&
      responseData.message &&
      responseData.status
    );
  }

}
