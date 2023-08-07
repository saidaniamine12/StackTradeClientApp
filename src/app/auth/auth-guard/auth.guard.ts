import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {map, tap} from "rxjs";


//You could permit access only to authenticated users or to users with a specific role.
// block or limit access until the user's account is activated.
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  return authService.isAuthenticated.pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        console.log("not authenticated" + isAuthenticated)
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    }),
    map((isAuthenticated) => {
      console.log("isAuthenticated"
        + isAuthenticated);
      return isAuthenticated; // Return true if authenticated, false if not
    })
  );
};
