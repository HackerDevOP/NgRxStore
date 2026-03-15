import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { IUser } from '../../shared/models/models';
import { Button } from "../../shared/components/button";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-card',
  template: `<div class="max-w-sm mx-auto bg-white rounded-xl overflow-hidden border shadow-2xl border-gray-200 hover:shadow-lg transition-shadow duration-300">

    <div class="p-6">
    <div class="flex items-center space-x-4">
      <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
        {{users()?.name?.firstname?.charAt(0)?.toUpperCase()}}{{users()?.name?.lastname?.charAt(0)?.toUpperCase()}}
      </div>
      <div>
        <h2 class="text-lg font-semibold text-gray-900 capitalize">{{users()?.name?.firstname}} {{users()?.name?.lastname}}</h2>
        <p class="text-sm text-gray-500">{{users()?.username}}</p>
      </div>
    </div>

    <div class="mt-6 border-t border-gray-100 pt-4 space-y-2">
      <div class="flex items-center text-sm text-gray-600">
        <span class="font-medium w-20">Email:</span>
        <span class="truncate">{{users()?.email}}</span>
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <span class="font-medium w-20">Phone:</span>
        <span>{{users()?.phone}}</span>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</h3>
      <p class="mt-1 text-sm text-gray-700">
        {{users()?.address?.street}}<br>
        {{users()?.address?.city}}, {{users()?.address?.zipcode}}
      </p>
      <div class="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Lat: {{users()?.address?.geolocation?.lat}} | Long: {{users()?.address?.geolocation?.long}}
      </div>
    </div>

    <div class="mt-6">
      <button appButton variant="pink-soft">
        Edit Profile
      </button>
    </div>
  </div>
</div>`,
  imports: [Button],
})
export class UserCard {
  users = input<IUser | null>(null);
}
