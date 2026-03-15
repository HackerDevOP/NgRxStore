import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Register } from '../../pages/register/register';
import { IUser } from '../models/models';

export type LoginRequest = {
  username: string,
  password:string
}
export type LoginResponse = {
  token:string
}

export type RegisterRequest ={
  id:number,
  username: string,
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly baseApiUrl = inject(API_URL)
  private readonly http = inject(HttpClient)


  login(request:LoginRequest){
    return this.http.post<LoginResponse>(`${this.baseApiUrl}/auth/login`,request)
  }

  register(request:RegisterRequest){
    return this.http.post<Register>(`${this.baseApiUrl}/users`,request)
  }
}
