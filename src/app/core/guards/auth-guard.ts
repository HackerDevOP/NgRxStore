import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../shared/store/auth-feature';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const store = inject(Store)
  const router = inject(Router);

  return store.select(authFeature.selectIsAuthenticated).pipe(
    map((t)=> {
      if(!t){
       return router.createUrlTree(['/login'])
      }
       return true;
    })
  )
};
