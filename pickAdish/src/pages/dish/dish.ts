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

  userID: any;
  //dish_name: any;
  dishid:string='1';
 // arrayDish = [];
   dish = {} as Dish;

  //dish : Dish;

 // rating: number;
  //like: boolean;

  d :  Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase, private authr :AngularFireAuth)
   {
  this.d= this.db.object(`dishes/1`).valueChanges();

  this.getallinfo(1);
  //this.dish_name = this.db.list(`dishes/1/name`);
  //var dishes = this.db.database.ref('dishes/1');
  
  

  this.authr.authState.subscribe(data=>{
    if(data&&data.email&&data.uid){
      this.userID = data.uid;
      }
      });

    //  this.db.list(`users/${this.userID}/likedDishes`).subscribe
 // this.dish.name = "dish name from database for example cake";
  //this.dish.AverageRating = 4.3;
  //this.dish.NumOfRaters = 23;
  }

  UpdateAverageRating(){

  //this.dish.average_rate =;


  }

  async getallinfo(uid){}

 //  AddRating(rating: number){}


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
    async liked() {
   //  this.dish_name = this.d.name;

      if(this.imgSrc1 == "assets/img/Like.png"){
      this.imgSrc1 = "assets/img/Liked.png";
       this.db.object(`users/${this.userID}/likedDishes/${this.dishid}`).set("cake");

      //this.db.list(`users/${this.userID}/likedDishes`).set().push('1');
      }
      else {
      this.imgSrc1 = "assets/img/Like.png";
      this.db.list(`users/${this.userID}/likedDishes`).remove(this.dishid);
      }
    }

    log(value){
     console.log(value);

    }
}


