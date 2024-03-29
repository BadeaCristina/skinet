import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brands';
import { IProductType } from '../shared/models/productType';
import {map} from 'rxjs/operators'
import { IProduct } from '../shared/models/product';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl='https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(brandId? : number, typeId?: number, sort?: string) {
     let params= new HttpParams();
     if(brandId){
      params=params.append('brandId', brandId.toString());
     }
     if(typeId){
      params=params.append('typeId', typeId.toString());
     }
     if(sort){
      params=params.append('sort', sort);
     }
     return this.http.get<IPagination>(this.baseUrl+'products', {observe:'response', params})
                     .pipe(
                        map(response => {
                          return response.body;
                        })
                     );
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands');
  }
  getTypes(){
    return this.http.get<IProductType[]>(this.baseUrl+'products/types');
  }
  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+ id);
  }

}
