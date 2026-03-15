import { createFeature, createReducer, on } from "@ngrx/store";
import { IUser } from "../../../shared/models/models";
import { ProfileActions } from "./profile-action";


export interface ProfileState {
  profiles: IUser[],
  profile:IUser|null
  isLoading: boolean,
  error: string|null
}


export const initialProfileState: ProfileState = {
  profiles: [],
  isLoading: false,
  error: null,
  profile: null
}

export const profileFeature = createFeature({
  name:"Profile",
  reducer: createReducer(
    initialProfileState,
    on(ProfileActions.load, (state)=>({
      ...state,
      isLoading:true
    })),
    on(ProfileActions.loadSuccess, (state, {profile})=>({
      ...state,
      profiles:profile,
      isLoading:false
    })),
    on(ProfileActions.loadFailure, (state, {error})=>({
      ...state,
      error:error,
      isLoading:false
    })),
    on(ProfileActions.loadProfile, (state)=>({
      ...state,
      isLoading:true
    })),
    on(ProfileActions.loadProfileSuccess, (state, {profile})=>({
      ...state,
      profile:profile,
      isLoading:false
    })),
    on(ProfileActions.loadFailure, (state, {error})=>({
      ...state,
      isLoading:false,
      error:error
    })),
  )

})
