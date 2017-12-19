import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from'../../models/dish';
import { Observable } from 'rxjs/Observable';
import {AngularFireObject, AngularFireDatabase} from 'angularfire2/database'
import{AngularFireAuth}from 'angularfire2/auth';
import{shop}from'../../models/shop';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  shopid:string;
shop:any;
dishes:Observable<Dish[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db:AngularFireDatabase,
    private authr :AngularFireAuth)
{
this.shopid=navParams.get('shopid');

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
