import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../../app.config";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../../../shared/models/models";
import { Observable } from "rxjs";

@Injectable({
  providedIn:"root"
})
export class UserApi{
  private readonly BaseApi = inject(API_URL)
  private readonly http = inject(HttpClient)


  getUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.BaseApi}/users`)
  }

  getUser(id:number):Observable<IUser>{
    return this.http.get<IUser>(`${this.BaseApi}/users/${id}`)
  }
}
