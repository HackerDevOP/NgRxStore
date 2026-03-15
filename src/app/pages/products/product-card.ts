import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from './types/product.type';
import { CurrencyPipe } from '@angular/common';
import { Button } from "../../shared/components/button";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-card',
  template: `<div class="max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 group">
  <div class="relative overflow-hidden rounded-t-xl bg-purple-100 aspect-square flex items-center justify-center p-6">
    <img class="object-contain h-48 w-full group-hover:scale-110 transition-transform duration-300" [src]="product().image" alt="Product Title" />

    <span class="absolute top-3 left-3 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">
      {{product().category}}
    </span>
  </div>

  <div class="p-5">
    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
      {{product().title}}
    </h5>

    <div class="flex items-center mb-3">
      <div class="flex items-center space-x-1 text-yellow-400">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      </div>
      <span class="ml-2 text-sm font-medium text-gray-500">{{product().rating.rate}} ({{product().rating.count}} reviews)</span>
    </div>

    <p class="mb-4 text-sm text-gray-600 line-clamp-2">
      {{product().description}}
    </p>

    <div class="flex items-center justify-between">
      <span class="text-2xl font-bold text-gray-900">{{product().price|currency}}</span>
      <button (click)="addToCart.emit(product())" appButton variant="pink-soft">
        Add to Cart
      </button>
    </div>
  </div>
</div>`,
  imports: [CurrencyPipe, Button],
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>()
}
