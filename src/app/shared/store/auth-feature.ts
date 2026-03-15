import { createFeature, createReducer, createSelector, on } from "@ngrx/store"
import { authActions } from "./auth-action"
import { IUser } from "../models/models"

export type authState = {
  token: string | null,
  userId: number | null
  error: string,
  isLoading: boolean
}

const getStoredToken = ():string|null=>{
  return sessionStorage.getItem('token');
}

export const initialAuthState: authState = {
  token: getStoredToken(),
  userId: null,
  error: "",
  isLoading: false
}


export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,

    on(authActions.loginSuccess, (state, { token, userId }) => ({
      ...state,
      userId: userId,
      token
    })),
    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
    })),


    //Register
    on(authActions.registerSuccess, (state) => ({
      ...state,
      isLoading: false
    })),
    on(authActions.registerFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(authActions.register, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.logout, (state)=> ({
      ...state,
      isLoading:true
    })),
    on(authActions.logoutSuccess, (state)=>({
      ...state,
      userId:null,
      token:null,
      isLoading:false
    })),
    on(authActions.logoutFailure, (state, {error})=>({
      ...state,
      error
    }))
  ),

  extraSelectors:({selectToken})=>({
    selectIsAuthenticated: createSelector(selectToken, (token)=> !!token)
  }),
})
