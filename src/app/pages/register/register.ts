import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Button } from '../../shared/components/button';
import { form, minLength, required, FormField, validate } from '@angular/forms/signals';
import { FormErrors } from "../../shared/components/form-errors";
import { registerSchema } from './register-scheme';

@Component({
  selector: 'app-register',
  template: `
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-2xl space-y-5 p-5 rounded-sm">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h1 class="text-center text-violet-700 text-2xl font-bold pb-3">Create an account</h1>
    <p class="mt-2 text-left text-sm border-b text-gray-500 pb-3 shadow-2xs">
      Enter your details below to get started.
    </p>
  </div>
    <form class="space-y-6 ">
      <div>
        <label for="username" class="block text-xs font-semibold uppercase tracking-wider text-gray-500">Username</label>
        <div class="mt-2">
          <input id="username" [formField]="registerForm.username" type="text"
            class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 outline-none placeholder-gray-400"
            placeholder="johndoe">
            <app-form-errors [control]="registerForm.username()" />
        </div>
      </div>

      <div>
        <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-gray-500">Email Address</label>
        <div class="mt-2">
          <input id="email" [formField]="registerForm.email" type="email" autocomplete="email"
            class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 outline-none placeholder-gray-400"
            placeholder="name@company.com">
            <app-form-errors [control]="registerForm.email()" />
        </div>
      </div>

      <div>
        <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-gray-500">Password</label>
        <div class="mt-2">
          <input id="password" [formField]="registerForm.password" type="password"
            class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 outline-none placeholder-gray-400"
            placeholder="••••••••">
            <app-form-errors [control]="registerForm.password()" />
        </div>
      </div>

      <div>
        <label for="confirmPassword" class="block text-xs font-semibold uppercase tracking-wider text-gray-500">Confirm Password</label>
        <div class="mt-2">
          <input id="confirmPassword" [formField]="registerForm.confirmpassword" type="text"
            class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 outline-none placeholder-gray-400"
            placeholder="••••••••">
            <app-form-errors [control]="registerForm.confirmpassword()" />
        </div>
      </div>

      <div>
        <button [disabled]="registerForm().invalid()" (click)="submit()" type="button" class=" w-full" appButton variant="secondary" >
          Create Account
        </button>
      </div>
    </form>

    <p class="mt-8 text-center text-sm text-gray-600">
      Already have an account?
      <a routerLink="/login" class="font-medium text-black hover:underline underline-offset-4">Log in</a>
    </p>
  </div>
  `,
  imports: [RouterLink, Button, FormField, FormErrors],
  host: {
    style: 'align-items: anchor-center',
    class: 'min-h-screen flex item-center justify-center bg-slate-100 p-4'
  }
})
export class Register {
  submit() {
    if (this.registerForm().valid()) {
      console.log(this.registerForm().value())
    }
  }

  registerModel = signal({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  registerForm = form(this.registerModel, (rootPath) => {
    required(rootPath.username, { message: 'required' }),
      required(rootPath.email, { message: 'required' }),
      required(rootPath.password, { message: 'required' }),
      required(rootPath.confirmpassword, { message: 'required' }),
      minLength(rootPath.password, 6, { message: 'required min 6 length' })


    validate(rootPath.confirmpassword, ({ value, valueOf }) => {
      const password = valueOf(rootPath.password)
      const confirmPassword = value();

      if (!password) {
        return null;
      }
      if (password !== confirmPassword) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match'
        };
      }
      return null;
    })
  })

}
