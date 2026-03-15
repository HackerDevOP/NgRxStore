import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductApi } from '../service/product-api-service';
import { Router } from '@angular/router';
import { productsActions } from './product-action';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const productEffect = createEffect((actions$ = inject(Actions), productApi = inject(ProductApi), route = inject(Router)) => {

    return actions$.pipe(
      ofType(productsActions.load),

      exhaustMap(() => {
        return productApi.getProducts().pipe(
          map((product) => productsActions.loadSuccess({ products: product })),
          catchError((err) => of(productsActions.loadFailure({ error: err.error.message }))),
        );
      }),
    );
  },{functional:true}
);
