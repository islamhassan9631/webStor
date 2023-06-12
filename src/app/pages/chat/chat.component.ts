import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  ngOnInit(): void {
   this.userNameUpdate()
  }
  userName=''
  message=''
  messagelist:{message:string,userName:string,mine:boolean,time :any,m:any}[]=[]
  userlist:string[]=[]
  socket:any
  file:any
  st:string='typing..'
  @Output() sendmessageData=new EventEmitter()
  time1 :any=new Date().getHours()+1
  time2 :any=new Date().getMinutes()
  
  userNameUpdate(){
    this.socket=io.io(`https://getway.onrender.com/`)


  
    
  
    // ?userName=${name}
    // this.userName = name
  
    // this.socket.emit('set-user-name',this.socket.id)
    this.socket.on('user-list',(userlist:string[])=>{
      this.userlist=userlist
    })
  
  this.socket.on('onNewMessage',(data:any)=>{
  console.log(JSON.stringify(data));
  
    
    // {message:string,userName:string}
     if(data){
      this.messagelist.push({message:data.content.message,userName:data.content.name,mine:false,time:data.timeeee,m:data.tiemmnt})
      this.sendmessageData.emit(data)
      console.log(this.sendmessageData);
      
      localStorage.setItem("message",JSON.stringify(data))
      
     }
  })
  }
  my=''
  sendmessage(){
    this.socket.emit('newMessage',{name:this.my,message:this.message,time:new Date().getHours(),m:new Date().getMinutes()})
  
    this.message=""
    // this.messagelist.push({message:this.message,userName:this.userName,mine:true,time:new Date().getHours(),m:new Date().getMinutes()})
  
  }
 
  }

