import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ILogin, IRegister, IUser } from "../models/models";

export const authActions = createActionGroup({
  source:"auth",
  events:{
    login:props<ILogin>(),
    loginSuccess:props<{token:string, userId:number|null}>(),
    loginFailure:props<{error:string}>(),


    register:props<IRegister>(),
    registerSuccess:emptyProps(),
    registerFailure:props<{error:string}>(),

    logout:emptyProps(),
    logoutSuccess:emptyProps(),
    logoutFailure:props<{error:string}>(),
  }
})
