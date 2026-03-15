import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { cartActions } from "./cart-actions";
import { Cart } from "../types/cart-type";

export interface CartState {
  items: Cart[],
  loading: boolean,
  error: string | null
}

export const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null
}


export const cartFeature = createFeature({
  name: "Cart",
  reducer: createReducer(
    initialCartState,
    on(cartActions.loadCart, (state) => ({
      ...state,
      loading: true
    })),
    on(cartActions.loadCartSuccess, (state, { items }) => ({
      ...state,
      loading: false,
      items
    })),
    on(cartActions.loadCartFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(cartActions.addToCartSuccess, (state, { product }) => {
      const existProduct = state.items.find((item) => item.product.id === product.id);

      if (existProduct) {
        // UPDATING EXISTING
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }

      // ADDING NEW (Ensure this code is reached!)
      return {
        ...state,
        items: [...state.items, { product, quantity: 1 }]
      };
    }),
    on(cartActions.removeFromCart, (state, { productId }) => ({
      ...state,
      items: state.items.filter((item) => item.product.id !== productId)
    })),
    on(cartActions.updateQuantity, (state, { productId, quantity }) => ({
      ...state,
      items: quantity > 0
        ? state.items.map((item) => item.product.id === productId ? { ...item, quantity } : item)
        : state.items.filter((item) => item.product.id !== productId)
    })),
    on(cartActions.clearCart, (state) => ({
      ...state,
      items: []
    }))
  ),

  extraSelectors: ({ selectItems }) => ({
    // We use selectItems (plural) to represent the array
    selectCartCount: createSelector(
      selectItems,
      (items) => items.reduce((total, item) => total + item.quantity, 0)
    ),

    // Bonus: Calculate total price while we're at it
    selectCartTotal: createSelector(
      selectItems,
      (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    )
  })
});
