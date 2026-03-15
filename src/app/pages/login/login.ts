import { Component, inject, signal } from "@angular/core";
import { Button } from "../../shared/components/button";
import { RouterLink } from "@angular/router";
import { form, FormField, minLength, required } from "@angular/forms/signals";
import { FormsModule } from "@angular/forms";
import { FormErrors } from "../../shared/components/form-errors";
import { Store } from "@ngrx/store";
import { authActions } from "../../shared/store/auth-action";
import { authFeature } from "../../shared/store/auth-feature";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-login",
  template: `

<div class="mt-8 sm:mx-auto sm:w-full shadow-2xl sm:max-w-md">

    <div class=" py-8 px-4 shadow-sm border border-gray-100 sm:rounded-xl sm:px-10">
      <div>
        <h1 class="text-center text-violet-700 text-2xl font-bold pb-3 ">Login Page</h1>
      </div>
      <form class="space-y-6 mt-2">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="mt-1">
            <input id="email" [formField]="loginForm.username" type="email" autocomplete="email"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition duration-150">
             <app-form-errors [control]="loginForm.username()"/>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="text-sm">
              <a href="#" class="font-medium text-gray-600 hover:text-black">Forgot password?</a>
            </div>
          </div>
          <div class="mt-1">
            <input id="password" [formField]="loginForm.password" type="password" autocomplete="current-password"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition duration-150">
              <app-form-errors [control]="loginForm.password()"/>
          </div>
        </div>
        <button (click)="submit()"  [disabled]="loginForm().invalid() || isLoading()" type="button" class=" w-full" appButton variant="primary">{{isLoading()?'Signing in...':'Sign in'}}</button>

      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-slate-200 rounded-2xl text-gray-500">New here?</span>
          </div>
        </div>

        <div class="mt-6">
          <a routerLink="/register" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
            Create an account
          </a>
        </div>
      </div>
    </div>
  </div>
  `,
  host: {
    style: 'align-items: anchor-center',
    class: 'min-h-screen flex item-center justify-center bg-slate-100 p-4'
  },
  imports: [Button, RouterLink, FormField, FormsModule, FormErrors],
})
export class Login {

  private readonly store = inject(Store)
  protected readonly isLoading = toSignal(this.store.select(authFeature.selectIsLoading));


  submit() {
    if (this.loginForm().valid()) {
      console.log(this.loginForm().value())
      this.store.dispatch(authActions.login(this.loginForm().value()))
    } else {
      console.log('invalid request')
    }
  }
  loginModel = signal({
    username: 'johnd',
    password: 'm38rmF$'
  });

  loginForm = form(this.loginModel, (rootPath) => {
    required(rootPath.username, { message: 'Username required' }),
      required(rootPath.password, { message: 'Password required' }),
      minLength(rootPath.password, 6, { message: 'Min 6 length of password' })
  })
}


