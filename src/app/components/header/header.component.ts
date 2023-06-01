import { Component, Input } from '@angular/core';
import { Cart, CartIitem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
private _cart:Cart={items:[]}
itemsQuntity=0
@Input()
 get cart():Cart{
  return this._cart
}
set cart(cart:Cart){
  this._cart=cart
  this.itemsQuntity=cart.items.map((item) => item.quantity).reduce((pre,current)=>pre+current,0)
}
constructor(private cartservice:CartService){}
getTotal(items:Array<CartIitem>):number{
return this.cartservice.getTotal(items)
}
OnClearCart(){
  this.cartservice.clearCart()
}
}
