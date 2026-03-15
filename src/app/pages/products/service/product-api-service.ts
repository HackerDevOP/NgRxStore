import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../../app.config";
import { HttpClient } from "@angular/common/http";
import { Product } from "../types/product.type";

@Injectable({
  providedIn:"root"
})
export class ProductApi{
  private readonly baseUrl = inject(API_URL)
  private readonly http = inject(HttpClient)

  getProducts(){
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }
}
