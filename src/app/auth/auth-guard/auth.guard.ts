import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {ChangeDetectorRef, inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {map, tap} from "rxjs";
import {UserService} from "../../services/user-service/user.service";


//You could permit access only to authenticated users or to users with a specific role.
// block or limit access until the user's account is activated.
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userService = inject(UserService);
  const isAuthenticated$ = authService.isAuthenticated;
  let refresh = false;

  console.log("authGuard")
  return authService.isAuthenticated.pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated && !refresh) {
        isAuthenticated$.subscribe(
          isAuth => {
            if (isAuth && !refresh) {
            } else if (!isAuth && !refresh) {
              authService.refresh().subscribe(
                response => {
                  refresh = true;
                  AuthService.accessToken = response.accessToken ? response.accessToken : '';
                  if(AuthService.accessToken === ''){
                    authService.purgeAuth();
                    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return;
                  } else {
                    userService.getCurrentUser().subscribe(
                      response => {
                        authService.setAuth(response);
                        router.navigate([state.url]);

                      });
                  }
                }
              )
            }
          }
        );

      }
    }),
    map((isAuthenticated) => {
      return isAuthenticated; // Return true if authenticated, false if not
    })
  );
};
