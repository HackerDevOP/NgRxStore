import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { productsActions } from './store/product-action';
import { toSignal } from '@angular/core/rxjs-interop';
import { productFeature } from './store/product-feature';
import { ProductCard } from './product-card';
import { FormsModule } from '@angular/forms';
import { cartActions } from '../cart/store/cart-actions';
import { Product as productType } from './types/product.type';
import { Button } from "../../shared/components/button";

@Component({
  selector: 'app-products',
  template: `
    <div class="flex justify-between px-10 pt-5">
      <div>
        <h1 class="text-2xl font-bold text-slate-400">Products</h1>
      </div>
      <div>
        <input
          (ngModelChange)="onSearch($event)"
          type="text"
          [(ngModel)]="search"
          placeholder="search products..."
          class="border-slate-200 ps-4 focus:text-purple-600 border max-w-xl focus:border-pink-400 focus:outline-0 focus:ring-0 rounded-lg h-10"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mx-auto p-10">
      @if (loading()) {
        <div class="col-span-full flex justify-center items-center py-20">
        <button
          appButton
          [disabled]="true"
          variant="pink-vivid"
          class="items-center flex justify-center self-center"
        >
          <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>
        </div>
      } @else if (products()?.length) {
        @for (p of products(); track p) {
          <app-product-card (addToCart)="addToCart($event)" [product]="p" />
        }
      }
    </div>
  `,
  host: {
    class: 'flex flex-col',
  },
  imports: [ProductCard, FormsModule, Button],
})
export class Product implements OnInit {
  store = inject(Store);
  protected readonly products = toSignal(this.store.select(productFeature.selectFilteredProducts));
  protected readonly loading = toSignal(this.store.select(productFeature.selectIsLoading));
  protected readonly search = signal<string>('');

  addToCart(item: productType) {
    this.store.dispatch(cartActions.addToCart({ product: item }));
  }

  onSearch(search: string) {
    this.store.dispatch(productsActions.search({ searchQuery: search }));
  }
  ngOnInit(): void {
    this.store.dispatch(productsActions.load());
    this.store.dispatch(cartActions.loadCart());
  }
}
