import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from '@ngrx/store';
import { cartFeature } from '../../pages/cart/store/cart-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeature } from '../../shared/store/auth-feature';
import { authActions } from '../../shared/store/auth-action';
import { brand_Name } from '../const/constants';

@Component({
  selector: 'app-header',
  template: `<nav class="bg-white border-b border-gray-200 px-4 py-2.5 shadow-sm">
    <div class="flex flex-wrap justify-between items-center mx-auto max-center">
      <a routerLink="/products" class="flex items-center">
        <span class="self-center text-xl font-bold whitespace-nowrap text-indigo-600">
          {{brand}}
        </span>
      </a>
      <div class="flex items-center space-x-4 lg:order-2">
        <button
        routerLink="/profile"
        routerLinkActive="bg-pink-50"
          class="relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-gray-200 transition-colors"
        >
          <svg
            class="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span class="sr-only">Profile</span>
        </button>
        <button
        routerLink="/cart"
        routerLinkActive="bg-pink-50"
          class="relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-gray-200 transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span class="sr-only">Cart</span>
          <div
            class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-1"
          >
            {{cartCount()}}
          </div>
        </button>

        <button (click)="logoff()" appButton variant="pink-soft">
        Logout
      </button>
      </div>
    </div>
  </nav>`,
  imports: [RouterLink, RouterLinkActive, Button],
})
export class Header {
  brand = brand_Name
  store = inject(Store)

  protected readonly cartCount = toSignal(this.store.select(cartFeature.selectCartCount), { initialValue: 0 })

  logoff() {
    this.store.dispatch(authActions.logout())
  }
}
