
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import{Dish}from '../../models/dish';
import {DishPage} from '../dish/dish';
import 'rxjs/add/operator/filter';
import { Pipe, PipeTransform ,Inject} from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  dishesListRef$ :any;
searchQuery: string = '';
shops:any;
count:any;
// items: string[];
  constructor(public navCtrl: NavController ,private database: AngularFireDatabase) {
this.initializeItems();

 this.shops=this.database.list(`shops`).valueChanges();
  }

  goToDishPage(s){
    this.navCtrl.push(DishPage, {
      dishId: s.key
  });
  }

  getname(v){
    if(this.shops.id==v){
    return (this.shops.name);
  }
  }
  RestData(){
      this.dishesListRef$=this.database.list(`dishes`).valueChanges();
  }
filterT(v){
  this.dishesListRef$=this.dishesListRef$.filter((item)=>{
    return item.type==v;
  });
}

filterO(v){
  this.count==0;
  this.dishesListRef$=this.dishesListRef$.filter((item)=>{
    while(item.occasion!=null){
if(item.occasion[this.count]==v){
return true;}
this.count++;
  }
  });
}

Toggle(){

}
initializeItems() {



  //this.dishesListRef$=this.database.list(`dishes`).valueChanges();
  this.dishesListRef$ = this.database.list('dishes',
  ref => ref.orderByChild('price')) .snapshotChanges().map(
    changes=>{
      return changes.map(c=>({
        key :c.payload.key,
        ...c.payload.val()
      })

      )
    }
      );
}

getItems(ev) {
var val = ev.target.value;
// Reset items back to all of the items
this.initializeItems();
// set val to the value of the ev target

// if the value is an empty string don't filter the items
if (val && val.trim() != '') {
this.dishesListRef$= this.dishesListRef$.filter((item ) => {
  return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
})
}
}

}
