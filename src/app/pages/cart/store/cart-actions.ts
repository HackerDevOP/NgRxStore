import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../../products/types/product.type";
import { Cart } from "../types/cart-type";

export const cartActions = createActionGroup({
  source: 'Cart',
  events:{
    loadCart:emptyProps(),
    loadCartSuccess:props<{items:Cart[]}>(),
    loadCartFailure:props<{error:string}>(),


    addToCart:props<{product:Product}>(),
    addToCartSuccess:props<{product:Product}>(),
    addToCartFailure:props<{error:string}>(),

    removeFromCart:props<{productId:number}>(),

    updateQuantity:props<{productId:number, quantity:number}>(),

    clearCart:emptyProps()
  }
})
