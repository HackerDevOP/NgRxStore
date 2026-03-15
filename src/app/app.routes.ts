import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Product } from './pages/products/product';
import { Profile } from './pages/profile/profile';
import { Cart } from './pages/cart/cart';
import { MainLayout } from './pages/main-layout';
import { provideState } from '@ngrx/store';
import { productFeature } from './pages/products/store/product-feature';
import { provideEffects } from '@ngrx/effects';
import * as productEffect from './pages/products/store/product-effects';
import { profileFeature } from './pages/profile/store/profile-feature';
import * as profileEffect  from './pages/profile/store/profile-effects';
import * as singleProfileEffect  from './pages/profile/store/profile-effects';
import { cartFeature } from './pages/cart/store/cart-feature';
import * as CartEffect  from './pages/cart/store/cart-effects';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    providers:[provideState(cartFeature), provideEffects(CartEffect)],
    children: [
      {
        path: 'products',
        component: Product,
        providers:[provideState(productFeature), provideEffects(productEffect)]
      },
      {
        path: 'profile',
        component: Profile,
        providers:[provideState(profileFeature), provideEffects(profileEffect,singleProfileEffect)]
      },
      {
        path: 'cart',
        component: Cart
      }
    ]
  }

];
