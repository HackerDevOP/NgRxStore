import {  Component, inject, input } from '@angular/core';
import { Cart } from './types/cart-type';
import { Store } from '@ngrx/store';
import { cartActions } from './store/cart-actions';
import { Product } from '../products/product';

@Component({
  selector: 'app-cart-items',
  template: `<main class="grow py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div class="flex flex-col lg:flex-row gap-8">

                @for (c of cartItem(); track $index) {
                  <div class="lg:w-2/3">
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <ul class="divide-y divide-gray-100">
                            <li class="p-6 flex flex-col sm:flex-row items-center gap-6">
                                <img [src]="c.product.image" alt="">
                                <div class="grow w-full">
                                    <div class="flex justify-between items-start">
                                        <h3 class="font-bold text-gray-900 text-lg">{{c.product.title}}</h3>
                                        <button class="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-100 rounded-lg p-1">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        </button>
                                    </div>
                                    <p class="text-sm text-gray-500 mb-4">{{c.product.description}}</p>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                            <button (click)="cartItemRemove(c.product.id)" class="px-4 py-2 hover:bg-gray-50 text-gray-600 focus:outline-none focus:bg-indigo-50 transition-colors">-</button>
                                            <span class="px-4 py-2 font-bold text-gray-800 border-x border-gray-100">1</span>
                                            <button (click)="cartItemAdd(c.product.id, c.quantity)" class="px-4 py-2 hover:bg-gray-50 text-gray-600 focus:outline-none focus:bg-indigo-50 transition-colors">+</button>
                                        </div>
                                        <p class="font-extrabold text-gray-900 text-xl">{{c.product.price}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                }
              <!-- order summery -->
                <div class="lg:w-1/3">
                    <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sticky top-8">
                        <h2 class="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">Order Summary</h2>
                        <div class="space-y-4 mb-8">
                            <div class="flex justify-between text-gray-500">
                                <span>Subtotal (1 item)</span>
                                <span class="font-semibold text-gray-900">$299.00</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span class="text-green-600 font-bold">FREE</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>Estimated Tax</span>
                                <span class="font-semibold text-gray-900">$24.00</span>
                            </div>
                            <div class="pt-4 border-t border-gray-100 flex justify-between items-end">
                                <span class="text-gray-900 font-bold text-lg">Total Amount</span>
                                <span class="text-2xl font-black text-indigo-600">$323.00</span>
                            </div>
                        </div>

                        <button class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 active:scale-95">
                            Proceed to Checkout
                        </button>

                        <div class="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                            Secure Checkout Powered by Stripe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>`,
  imports: [],
})
export class CartItem {
  private store = inject(Store)

  cartItem = input<Cart[]>()



  cartItemAdd(productId: number, quantity: number) {
    this.store.dispatch(cartActions.updateQuantity({ productId, quantity }))
  }
  cartItemRemove(productId: number) {
    this.store.dispatch(cartActions.removeFromCart({ productId }))
  }
}
