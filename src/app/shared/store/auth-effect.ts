import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApi } from "../services/auth-api";
import { Router } from "@angular/router";
import { authActions } from "./auth-action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { extractToken } from "../../utils/extract-token";


export const loginEffect = createEffect(() => {
  const actions$ = inject(Actions);
  const authApi = inject(AuthApi);
  const route = inject(Router);

  return actions$.pipe(
    ofType(authActions.login),

    switchMap((loginRequest) => {
      return authApi.login(loginRequest).pipe(
        map((response) => {
          sessionStorage.setItem("token", response.token)
          const payload = extractToken(response.token)
          route.navigateByUrl('/products');
          if(payload){
            return authActions.loginSuccess({ token: response.token, userId: payload.sub})
          }
          return authActions.loginSuccess({token: response.token, userId: null})
        }),
        catchError((err) => {
          return of(authActions.loginFailure({ error: err.error.message }))
        })
      )
    })
  )
}, { functional: true })


export const RegisterEffect = createEffect(() => {
  const actions$ = inject(Actions);
  const authApi = inject(AuthApi);
  const route = inject(Router);

  return actions$.pipe(
    ofType(authActions.register),

    exhaustMap((registerRequest) => {
      return authApi.register(registerRequest).pipe(
        map((response) => {
          route.navigateByUrl('/login');
          return authActions.registerSuccess()
        }),
        catchError((err) => {
          return of(authActions.registerFailure({ error: err.error.message }))
        })
      )
    })
  )
}, { functional: true })



export const logOutEffect = createEffect(()=>{
  const action$ = inject(Actions);
  const route = inject(Router)

  return action$.pipe(
    ofType(authActions.logout),

    map(()=>{
      sessionStorage.removeItem('token')
      route.navigateByUrl('/login')
      return authActions.logoutSuccess()
    }),
    catchError((err)=> of(authActions.logoutFailure({error:err})))
  )
},{functional:true})
