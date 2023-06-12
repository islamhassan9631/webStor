import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Output() userNameEvent=new EventEmitter<string>()
  userName=''
  
  SetuserName(){
  this.userNameEvent.emit(this.userName)
  }
  }
  
