import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IUser } from '../../../shared/models/models';

export const ProfileActions = createActionGroup({
  source:"Profile",
  events: {
    load:emptyProps(),
    loadSuccess:props<{ profile: IUser[] }>(),
    loadFailure:props<{error:string}>(),


    loadProfile:props<{userId:number}>(),
    loadProfileSuccess:props<{profile:IUser}>(),
    loadProfileFailure:props<{error:string}>(),

  }
})
