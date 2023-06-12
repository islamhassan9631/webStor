import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartIitem, chat } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent   implements OnInit{
private _cart:Cart={items:[]}
not:{message:string,userName:string,mine:boolean,time :any,m:any}[]=[]
socket:any
notification:any
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
  ngOnInit(): void {
   this.userNameUpdate()
  }
getTotal(items:Array<CartIitem>):number{
return this.cartservice.getTotal(items)
}
OnClearCart(){
  this.cartservice.clearCart()
}
clearnot(){
  this.not=[]
  this.notification=0
}
userNameUpdate(){
  this.socket=io.io(`http://localhost:3000`)
  console.log(name);
  

  

  // ?userName=${name}
  // this.userName = name

  this.socket.emit('set-user-name',this.socket.id)
  this.socket.on('user-list',(userlist:string[])=>{
    
  })

this.socket.on('onNewMessage',(data:any)=>{
console.log(JSON.stringify(data));

  
  // {message:string,userName:string}
   if(data){
    this.not.push({message:data.content.message,userName:data.content.name,mine:false,time:data.timeeee,m:data.tiemmnt})
   
    this.notification=this.not.length
   
    
   }
})
}
}
