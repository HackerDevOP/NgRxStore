import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cartActions } from "./cart-actions";
import { exhaustMap, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { cartFeature } from "./cart-feature";


const SessionData = 'ngrxStore_Cart'
export const loadCartEffect = createEffect((
  action$ = inject(Actions)

) => {
  return action$.pipe(
    ofType(cartActions.loadCart),

    map(() => {
      const cartData = sessionStorage.getItem(SessionData)
      const items = cartData ? JSON.parse(cartData) : []
      return cartActions.loadCartSuccess({ items })
    })
  )
},
  { functional: true }
)

export const addToCartEffect = createEffect((
  action$ = inject(Actions)
) => {
  return action$.pipe(
    ofType(cartActions.addToCart),

    exhaustMap(({ product }) => of(cartActions.addToCartSuccess({ product })))
  )
}, { functional: true }
)


export const persistentCartEffect = createEffect((
  action$ = inject(Actions),
  store = inject(Store)
) => {
  return action$.pipe(
    ofType(
      cartActions.addToCartSuccess,
      cartActions.removeFromCart,
      cartActions.updateQuantity,
      cartActions.clearCart
    ),
    withLatestFrom(store.select(cartFeature.selectItems)),
    tap(([, items]) => {
      sessionStorage.setItem(SessionData, JSON.stringify(items))
    })
  )
}, {
  functional: true,
  dispatch: false
})
