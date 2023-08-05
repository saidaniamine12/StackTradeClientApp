import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";


//You could permit access only to authenticated users or to users with a specific role.
// block or limit access until the user's account is activated.
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser){
    //user is logged in so return true
    return true;
  }
  //not logged in , redirect to login page
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
