import { Component } from '@angular/core';
import { brand_Name } from '../const/constants';

@Component({
  selector: 'app-footer',
  template: `<footer class="bg-white border-t border-gray-200 mt-auto">
  <div class="mx-auto w-full p-4 py-6 lg:py-8">
    <div class="md:flex md:justify-between">
      <div class="mb-6 md:mb-0">
        <a href="/" class="flex items-center">
          <span class="self-center text-2xl font-bold whitespace-nowrap text-indigo-600">{{brand}}</span>
        </a>
        <p class="mt-2 text-sm text-gray-500 max-w-xs">
          Making the world a better place through high-quality products and exceptional service.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
          <ul class="text-gray-500 font-medium">
            <li class="mb-4">
              <a href="#" class="hover:underline">Documentation</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Tailwind CSS</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
          <ul class="text-gray-500 font-medium">
            <li class="mb-4">
              <a href="#" class="hover:underline">Github</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Discord</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
          <ul class="text-gray-500 font-medium">
            <li class="mb-4">
              <a href="#" class="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 " />

    <div class="sm:flex sm:items-center sm:justify-between">
      <span class="text-sm text-gray-500 sm:text-center">
        © 2026 <a href="/" class="hover:underline">{{brand}}™</a>. All Rights Reserved.
      </span>
      <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
        <a href="#" class="text-gray-400 hover:text-indigo-600">
           <span class="sr-only">Twitter</span>
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>`,
  imports: [],
})
export class Footer {
  brand = brand_Name
}
