import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from'../../models/dish';
import { Observable } from 'rxjs/Observable';
import {AngularFireObject, AngularFireDatabase} from 'angularfire2/database'
import{AngularFireAuth}from 'angularfire2/auth';

/**
 * Generated class for the DishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dish',
  templateUrl: 'dish.html',
})
export class DishPage {
  //average_rate: number;
  avg: any;
  raters: any;
  userID: any;
  dish_name: any;
  dishid:string;
 // arrayDish = [];
 //dish = {} as Dish;

dish : any;

 // rating: number;
  //like: boolean;

  d :  Observable<any>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db:AngularFireDatabase,
              private authr :AngularFireAuth)
   {}
}
