import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApi } from '../service/user-api-service';
import { ProfileActions } from './profile-action';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const profileEffect = createEffect(
  (profileApi = inject(UserApi), action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(ProfileActions.load),
      exhaustMap(() =>
        profileApi.getUsers().pipe(
          // FIX: Added 'return' (implicitly via removing curly braces)
          // to dispatch the action to the Store
          map((profiles) =>
            ProfileActions.loadSuccess({ profile: profiles})
          ),
          catchError((err) =>
            of(ProfileActions.loadFailure({ error: err.error?.message || 'Unknown Error' }))
          )
        )
      )
    );
  },
  { functional: true }
);



export const singleProfileEffect = createEffect(
  (profileApi = inject(UserApi), action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(ProfileActions.loadProfile),
      exhaustMap(({userId}) =>
        profileApi.getUser(userId).pipe(
          // FIX: Added 'return' (implicitly via removing curly braces)
          // to dispatch the action to the Store
          map((profile) =>
            ProfileActions.loadProfileSuccess({ profile: profile})
          ),
          catchError((err) =>
            of(ProfileActions.loadProfileFailure({ error: err.error?.message || 'Unknown Error' }))
          )
        )
      )
    );
  },
  { functional: true }
);
