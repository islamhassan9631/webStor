import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit ,OnDestroy{
  @Output() showCategory=new EventEmitter<string>();
categories:Array<string> |undefined
categoriesSubscription: Subscription | undefined
constructor(private stor:StoreService){}
  
  ngOnInit(): void {
   this.categoriesSubscription= this.stor.getALLCategies().subscribe((res)=>{

    
      this.categories=res
    });
  }
  ngOnDestroy(): void {
   if(this.categoriesSubscription){
    this.categoriesSubscription.unsubscribe()
   }
  }
onshowCategory(category:string){
this.showCategory.emit(category)
}
}
