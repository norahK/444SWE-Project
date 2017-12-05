import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
 import{AngularFireDatabase} from 'angularfire2/database';
 import { Observable } from 'rxjs/Observable';
import{Dish}from '../../models/dish';
import {DishPage} from '../dish/dish';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




export class HomePage {

dishesListRef$:Observable<any>;
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
    this.initializeItems();
    var val = ev.target.value;
    if (val && val.trim() != '') {
     /* this.dishesListRef$ = this.database.list('dishes',
      ref => ref.orderByChild('negativtimestamp')).valueChanges()
      .filter(item => item.values === val);*/

      this.dishesListRef$ = this.dishesListRef$.filter((v) => {
        if(v.name && val) {
          if (v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            return v;
          }
          return "false";
        }
      });


  /*this.dishesListRef$= this.database.list('dishes',
  ref => ref.orderByChild("childNode")
  .startAt("[a-zA-Z0-9]*")
  .endAt(val)).valueChanges();*/
  //.orderByChild('_searchLastName').startAt(val).endAt(val+"\uf8ff")
    }
  // Reset items back to all of the items


  // set val to the value of the ev target

  // if the value is an empty string don't filter the items

  //if (val && val.trim() != '') {
  /*  this.dishesListRef$ = this.dishesListRef$.filter((item) => {
      return (item[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })*/
 // }
  }
}
