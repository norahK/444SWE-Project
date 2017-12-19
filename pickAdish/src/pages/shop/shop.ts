import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from'../../models/dish';
import { Observable } from 'rxjs/Observable';
import {AngularFireObject, AngularFireDatabase} from 'angularfire2/database'
import{AngularFireAuth}from 'angularfire2/auth';
import{shop}from'../../models/shop';
import {DishPage} from '../dish/dish';


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
    private authr :AngularFireAuth,private database: AngularFireDatabase)
{
this.shopid=navParams.get('shopId');
this.getalldishes(this.shopid)
this.shop=this.db.object(`shops/${this.shopid}`).valueChanges();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }
  goToDishPage(s){
    this.navCtrl.push(DishPage, {
      dishId: s.key
  });
  }
getalldishes(shop){
  this.dishes = this.database.list('dishes',
  ref => ref.orderByChild('shop').equalTo(shop)).snapshotChanges().map(
    changes=>{
      return changes.map(c=>({
        key :c.payload.key,
        ...c.payload.val()
      })

      )
    }
      );

}
}
