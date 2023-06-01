import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent {
  @Output() columsChange= new EventEmitter<number>()
  @Output()itemChange= new EventEmitter<number>()
  @Output() sortChange= new EventEmitter<string>()
sort="desc"
itemsShowCount=12
onSortUpdated(newSort:string):void{
  this.sort=newSort
  this.sortChange.emit(newSort)
}
onItemUpdated(count:number){
  this.itemsShowCount=count
  this.itemChange.emit(count)
}
onColumesUpdated(colsNum:number){
this.columsChange.emit(colsNum)
}
}




