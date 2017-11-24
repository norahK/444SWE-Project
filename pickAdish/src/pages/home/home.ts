import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
 import{AngularFireDatabase} from 'angularfire2/database';
 import { Observable } from 'rxjs/Observable';
import{Dish}from '../../models/dish';
import {DishPage} from '../dish/dish';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




export class HomePage {

dishesListRef$:Observable<Dish[]>;
searchQuery: string = '';
// items: string[];

  constructor(public navCtrl: NavController ,private database: AngularFireDatabase) {
//this.dishesListRef$=this.database.list('dishes').valueChanges();
 this.initializeItems();

  }
  goToDishPage(s){
this.navCtrl.push(DishPage)
  }
  initializeItems() {
  this.dishesListRef$= this.database.list('dishes').valueChanges();

  }

  getItems(ev) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the ev target
  var val = ev.target.value;

  // if the value is an empty string don't filter the items

  //if (val && val.trim() != '') {
  /*  this.dishesListRef$ = this.dishesListRef$.filter((item) => {
      return (item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })*/
 // }

  /*if (val && val.trim() != '') {
    this.dishesListRef$ = this.dishesListRef$.filter((item) => {
      return (item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }*/

}
}
