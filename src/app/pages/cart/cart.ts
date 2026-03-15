import { Component, computed, inject, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button';
import { Store } from '@ngrx/store';
import { cartFeature } from './store/cart-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { cartActions } from './store/cart-actions';

@Component({
  selector: 'app-cart',
  template: `
    @if (loading()) {
      <div class="lg:w-2/3 space-y-4">
        <div class="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse flex gap-6">
          <div class="w-24 h-24 bg-gray-200 rounded-xl"></div>
          <div class="grow space-y-4">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-100 rounded w-1/2"></div>
            <div class="flex justify-between items-center pt-4">
              <div class="h-8 bg-gray-100 rounded w-24"></div>
              <div class="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    } @else if (cartItems()?.length) {
      <main class="grow py-8">
        <div class="container mx-auto px-4 max-w-6xl">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-2/3 space-y-2">
              @for (items of cartItems(); track items) {
                <div
                  class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <ul class="divide-y divide-gray-100">
                    <li class="p-6 flex flex-col sm:flex-row items-center gap-6">
                      <img class="w-20" [src]="items.product.image" alt="" />
                      <div class="grow w-full">
                        <div class="flex justify-between items-start">
                          <h3 class="font-bold text-gray-900 text-lg">{{ items.product.title }}</h3>
                          <button
                            (click)="onRemove(items.product.id)"
                            class="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-100 rounded-lg p-1"
                          >
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <p class="text-sm text-gray-500 mb-4">{{ items.product.category }}</p>
                        <div class="flex items-center justify-between">
                          <div
                            class="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                          >
                            <button
                              (click)="onUpdateCart(items.product.id, items.quantity - 1)"
                              class="px-4 py-2 hover:bg-gray-50 text-gray-600 focus:outline-none focus:bg-indigo-50 transition-colors"
                            >
                              -
                            </button>
                            <span
                              class="px-4 py-2 font-bold text-gray-800 border-x border-gray-100"
                              >{{ items.quantity }}</span
                            >
                            <button
                              (click)="onUpdateCart(items.product.id, items.quantity + 1)"
                              class="px-4 py-2 hover:bg-gray-50 text-gray-600 focus:outline-none focus:bg-indigo-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <p class="font-extrabold text-gray-900 text-xl">
                            {{ items.product.price | currency }}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              }
            </div>
            <!-- order summery -->
            <div class="lg:w-1/3">
              <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-8 sticky top-8">
                <h2 class="text-xl font-bold text-gray-900 mb-6 border-b border-gray-50 pb-4">
                  Order Summary
                </h2>
                <div class="space-y-4 mb-8">
                  <div class="flex justify-between text-gray-500">
                    <span>Subtotal {{ cartCount() }} items</span>
                    <span class="font-semibold text-gray-900">{{ cartTotal() | currency }}</span>
                  </div>
                  <div class="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    @if (cartTotal() > 500) {
                      <span class="text-green-600 font-bold">FREE</span>
                    } @else {
                      <span class="text-green-600 font-bold">{{
                        cartTotal() < 500 ? shippingCharges : (0 | currency)
                      }}</span>
                    }
                  </div>
                  <div class="flex justify-between text-gray-500">
                    <span>Estimated Tax</span>
                    <span class="font-semibold text-gray-900">{{ taxCharges | currency }}</span>
                  </div>
                  <div class="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <span class="text-gray-900 font-bold text-lg">Total Amount</span>
                    <span class="text-2xl font-black text-indigo-600">{{
                      withTaxes() | currency
                    }}</span>
                  </div>
                </div>

                <div class="justify-between flex">
                  <button appButton variant="pink-soft">Proceed to Checkout</button>
                  <button (click)="clearCart()" appButton variant="destructive">Clear Cart</button>
                </div>

                <div
                  class="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Secure Checkout Powered by Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    } @else {
      <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div class="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <svg
            class="w-16 h-16 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is feeling a bit lonely</h2>
        <p class="text-gray-500 max-w-sm mb-8">
          Looks like you haven't added anything to your cart yet. Explore our latest arrivals and
          find something you'll love!
        </p>

        <a
          routerLink="/products"
          class="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100 active:scale-95"
        >
          Start Shopping
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    }
  `,
  host: { class: 'bg-gray-50 flex flex-col min-h-screen' },
  imports: [RouterLink, CurrencyPipe, Button],
})
export class Cart implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(cartActions.loadCart());
  }

  private readonly store = inject(Store);

  protected readonly loading = toSignal(this.store.select(cartFeature.selectLoading));
  protected readonly cartItems = toSignal(this.store.select(cartFeature.selectItems));
  protected readonly cartTotal = toSignal(this.store.select(cartFeature.selectCartTotal), {
    initialValue: 0,
  });
  protected readonly cartCount = toSignal(this.store.select(cartFeature.selectCartCount), {
    initialValue: 0,
  });

  shippingCharges: number = 11.99;
  taxCharges: number = 14;

  withTaxes = computed(() => {
    const bill = this.cartTotal();
    if (this.cartTotal() < 500) {
      return bill + this.shippingCharges + this.taxCharges;
    }
    return bill + this.taxCharges;
  });

  protected onDecrease(productId: number, quantity: number) {
    this.store.dispatch(cartActions.updateQuantity({ productId, quantity }));
  }
  protected onIncrease(productId: number, quantity: number) {
    this.store.dispatch(cartActions.updateQuantity({ productId, quantity }));
  }
  protected onReset() {
    this.store.dispatch(cartActions.clearCart());
  }
  onUpdateCart(productId: number, quantity: number) {
    this.store.dispatch(cartActions.updateQuantity({ productId, quantity }));
  }
  onRemove(productId: number) {
    this.store.dispatch(cartActions.removeFromCart({ productId }));
  }
  clearCart() {
    this.store.dispatch(cartActions.clearCart());
  }
}
