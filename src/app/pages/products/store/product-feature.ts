import { createFeature, createReducer, on } from "@ngrx/store"
import { Product } from "../types/product.type"
import { productsActions } from "./product-action"

export type ProductState={
  products:Product[],
  filteredProducts:Product[],
  searchQuery:string|null,
  isLoading: boolean,
  error:string |null
}


export const initialProductState:ProductState ={
  products: [],
  isLoading: false,
  error: null,
  filteredProducts: [],
  searchQuery: null
}


export const productFeature = createFeature({
  name:"products",
  reducer: createReducer(
    initialProductState,
    on(productsActions.load, (state)=>({
      ...state,
      isLoading:true
    })),
    on(productsActions.loadSuccess , (state, {products})=>({
      ...state,
      products:products,
      filteredProducts:products,
      isLoading:false
    })),
    on(productsActions.loadFailure, (state, {error})=>({
      ...state,
      error:error
    })),
    on(productsActions.search, (state, {searchQuery})=>{
      const filter = state.products.filter((query)=>
        query.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      return{
        ...state,
        searchQuery:searchQuery,
        filteredProducts:filter
      }
    })
  )
})
