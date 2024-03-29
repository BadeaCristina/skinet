import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brands';
import { IProductType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[]
  brandIdSelected = 0;
  typeIdSelected =0;
  sortSelected = 'name';
  sortOptions= [{name: 'Alphabetical', value:'name'},
                {name: 'Price: Low to High', value:'priceAsc'},
                {name: 'Price: High to Low', value:'priceDesc'}];
  constructor(private shopSerivice: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopSerivice.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe(response =>{
      this.products = response.data;
    },
    error =>{
      console.log(error);
    })
  }

  getBrands(){
    this.shopSerivice.getBrands().subscribe(response =>{
        this.brands = [{id:0, name:'All'}, ...response];
    },
    error =>{
      console.log(error);
    })
    
  }
  getTypes(){
    this.shopSerivice.getTypes().subscribe(response =>{
        this.types =  [{id:0, name:'All'}, ...response];
    },
    error =>{
      console.log(error);
    })
  }

  onBrandSelected(brandId: number){
        this.brandIdSelected = brandId;
        this.getProducts();
  }
  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(sort : string){
    this.sortSelected = sort;
    this.getProducts();
  }
}
