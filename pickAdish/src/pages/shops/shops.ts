
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import{AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import{shop}from '../../models/shop';
import{ShopPage}from '../shop/shop';

import { Pipe, PipeTransform ,Inject} from '@angular/core';
import firebase from 'firebase';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'page-shops',
  templateUrl: 'shops.html'
})

export class ShopsPage {

  shopsListRef$:any;
  searchQuery: string = '';
  constructor(public navCtrl: NavController,private database: AngularFireDatabase) {
this.initializeItems();
  }

  filterData(){
  this.shopsListRef$=this.shopsListRef$.filter((item)=>{
    return ;
  });
}

  initializeItems() {
  this.shopsListRef$= this.database.list('shops',
  ref => ref.orderByChild('location')) .snapshotChanges().map(
    changes=>{
      return changes.map(c=>({
        key :c.payload.key,
        ...c.payload.val()
      })

      )
    }
      );
    }
    gotoshoppage(shop){
      this.navCtrl.push(ShopPage, {
        shopId: shop.key
    });

    }
  getItems(ev) {
  var val = ev.target.value;
  // Reset items back to all of the items
  this.initializeItems();
  // set val to the value of the ev target

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
  this.shopsListRef$= this.shopsListRef$.filter((item ) => {
    return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  })
  }
  }
}
