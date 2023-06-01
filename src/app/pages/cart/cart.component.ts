import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';
import { Cart, CartIitem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
constructor(private cartService:CartService,private http:HttpClient){}
cart:Cart={items:[{
  product:"https://via.placeholder.com/150",
  name:"snickers",
  price:150,
  quantity:1,
  id:1
},{
  product:"https://via.placeholder.com/150",
  name:"snickers",
  price:150,
  quantity:3,
  id:2
}]}
dataSource:Array<CartIitem>=[]
dispalyColumuns:Array<string>=[
  "product",
  'name',
  'price',
  'quantity',
  'total',
  'action'
]


ngOnInit(): void {
 
 this.cartService.cart.subscribe((_cart:Cart)=>{
  this.cart=_cart
  this.dataSource = this.cart.items
 })
}
getTotal(items:Array<CartIitem>){
return  items.
  map((item)=>item.price * item.quantity).reduce((pre,current)=>pre + current,0)
}
onClearCart(){
  this.cartService.clearCart()
}
onRemove(item:CartIitem){
  this.cartService.removeFromCart(item)
}
onAddquantity(items:CartIitem){
  this.cartService.addToCart(items)
}
onremovequantity(item:CartIitem){
  this.cartService.removeitem(item)
}
OnCheckout():void {
this.http.post('http://localhost:4242/checkout',{
  items:this.cart.items
}).subscribe(async (res:any)=>{
  let stripe=await loadStripe("pk_test_51NBDWnLp9DONMxeM29udcv4c52nKJooLulZVVvRUnOCKnvwtl9Qj1uqcpPaSkUYeZPIcCpO3hzUGT3Dqgurx2ps80011zwILJF")
  stripe?.redirectToCheckout({
    sessionId:res.id
  })
})
}
}