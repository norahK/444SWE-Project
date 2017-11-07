import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from'../../models/dish';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database'

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
 dish = {} as Dish;

  //dish : Dish;

  rating: number;
  like: boolean;

  //dish :  Observable<Dish>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase,)
   {
   // this.dish= this.db.object(`users/${logedin.uid}`).valueChanges();
    
  this.dish.name = "dish name from database for example cake"; 
  }
  

   AddRating(rating: number){}


  ionViewDidLoad() {
    console.log('ionViewDidLoad DishPage');
  }


  tap: string = "type";
  isAndroid: boolean = false;

  //constructor(platform: Platform) {
  //  this.isAndroid = platform.is('android');}

 imgSrc1: string = "assets/img/Like.png";

  onMouseOver1(): void {
    this.imgSrc1 = "assets/img/Liked.png";
  }

  onMouseOut1(): void {
    this.imgSrc1 = "assets/img/Like.png";
  }
  imgSrc2: string = "assets/img/Rate.png";

  onMouseOver2(): void {
    this.imgSrc2 = "assets/img/Rated.png";
  }

  onMouseOut2(): void {
    this.imgSrc2 = "assets/img/Rate.png";
    }
}


