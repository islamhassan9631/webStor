import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT:{[id:number]:number}={1:400,3:335,4:350}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {
  cols=3
  rowHeight=ROWS_HEIGHT[this.cols]
  category:string|undefined
  products:Array<Product> |undefined
  sort="desc"
  count="12"
  productsSubscription:Subscription | undefined

  constructor( private cartservice:CartService,private storeService:StoreService){}
  
  
  oncolumsCountchange(colsNum:number){
this.cols=colsNum
this. rowHeight=ROWS_HEIGHT[this.cols]
  }
  onshowCategory(newCategory:string){
this.category=newCategory
this.getProducts()
  }
  onItemChenge(newCount:number){
    this.count=newCount.toString()
    this.getProducts()
  }
  onsortChange(newSort:string){
    this.sort=newSort
    this.getProducts()
  }
  Onaddtocart(product:Product){
this.cartservice.addToCart({
  product:product.image,
  name:product.title,
  price:product.price,
  quantity:1,
  id:product.id
})

  }
  ngOnInit(): void {
 this.getProducts()
  }
  getProducts(){
   this.productsSubscription= this.storeService.getAllProducts(this.count,this.sort,this.category).subscribe((_product)=>{
      this.products=_product
    })
  }
  ngOnDestroy(): void {
  if(this.productsSubscription){
    this.productsSubscription.unsubscribe()
  }
  }
}
