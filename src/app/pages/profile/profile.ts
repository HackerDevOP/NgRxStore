import { profileFeature, ProfileState } from './store/profile-feature';
import {  Component, inject, OnInit } from '@angular/core';
import { UserCard } from "./user-card";
import { Store } from '@ngrx/store';
import { ProfileActions } from './store/profile-action';
import { toSignal } from '@angular/core/rxjs-interop';
import { authActions } from '../../shared/store/auth-action';
import { authFeature } from '../../shared/store/auth-feature';
import { extractToken } from '../../utils/extract-token';

@Component({
  selector: 'app-profile',
  template: `
    <app-user-card
    class="p-10 "
    [users]="profiles()"
    />
  `,
  host:{
    class:"min-h-screen bg-gray-50 flex flex-col"
  },
  imports: [UserCard],
})
export class Profile implements OnInit {


  store = inject(Store)

  profiles = toSignal(this.store.select(profileFeature.selectProfile), { initialValue: null })
  loggedUser = toSignal(this.store.select(authFeature.selectUserId))

  payload = extractToken(sessionStorage.getItem("token")!)



  ngOnInit(): void {
    this.store.dispatch(ProfileActions.loadProfile({userId:this.payload?.sub!}))
    console.log(this.payload)
  }
}
