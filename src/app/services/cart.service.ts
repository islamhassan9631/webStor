import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart,CartIitem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cart=new BehaviorSubject<Cart>({items:[]})
  constructor(private _snackBar:MatSnackBar) { }

  addToCart(item:CartIitem): void {
const items=[...this.cart.value.items]
const itemInCart=items.find((_item) => _item.id===item.id)
if(itemInCart){
itemInCart.quantity +=1
}else{
  items.push(item)
}
this.cart.next({items})
this._snackBar.open('1 item added to cart','ok',{duration:3000,})
console.log(this.cart.value);

  }
  removeitem(item:CartIitem){
    let itemForRemove:CartIitem |undefined
  let filteredItems=  this.cart.value.items.map((_item)=>{
  if(_item.id===item.id){
    _item.quantity--
    if(_item.quantity===0){
      itemForRemove=_item

    }
  }
  return _item
})
if(itemForRemove){
  filteredItems=  this.removeFromCart(itemForRemove,false)
}
this.cart.next({items:filteredItems})
this._snackBar.open('1 item removed from',"ok",{duration:300})
  }

  getTotal(items:Array<CartIitem>){
    return  items.
      map((item)=>item.price * item.quantity).reduce((pre,current)=>pre + current,0)
    }
    clearCart(){
      this.cart.next({items:[]})
      this._snackBar.open('cart cleared','ok',{duration:3000})
    }
    removeFromCart(items:CartIitem,update=true){
  const filterItems=    this.cart.value.items.filter((_item)=>_item.id!==items.id)
  if(update){
     this.cart.next({items:filterItems})
  this._snackBar.open('1 item removed from cart','ok',{duration:3000})
  }
 return filterItems
    }
}
