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
  constructor(public navCtrl: NavController ,private database: AngularFireDatabase) {
this.dishesListRef$=this.database.list('dishes').valueChanges();

  }
  goToDishPage(s){
this.navCtrl.push(DishPage)



  }
  getItems($event){


  }
}
