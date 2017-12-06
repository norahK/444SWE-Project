import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from'../../models/dish';
import {Rating} from'../../models/rating';

import { Observable } from 'rxjs/Observable';
import {AngularFireObject, AngularFireDatabase} from 'angularfire2/database'
import{AngularFireAuth}from 'angularfire2/auth';
/**
 * Generated class for the IonRatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRating {
 /* userID: any;
  //dish_name: any;
  dishid:string='1';
  RatingPath :any;
  
 // arrayDish = [];
   dish = {} as Dish;

  //dish : Dish;
  //   rating = {} as Rating;
   rating : Rating;

 // rating: number;
  //like: boolean;

  d :  Observable<any>; */
 //text: string;

 @Input() numStars: number = 5;
 @Input() value: number = 0;
 @Input() read: boolean = false;
 
 @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

 stars: String[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFireDatabase, private authr :AngularFireAuth) {
    //console.log('Hello IonRating Component');
    //this.text = 'Hello World';
  /*  this.d= this.db.object(`dishes/1`).valueChanges();
    
      this.getallinfo(1);
      
      this.RatingPath = db.database.ref('rating');
      
    
      this.authr.authState.subscribe(data=>{
        if(data&&data.email&&data.uid){
          this.userID = data.uid;
          }
          });    
          this.rating.dish_id = this.dishid;
          this.rating.user_id = this.userID;   */   
  }
  // async getallinfo(uid){}

  ngAfterViewInit(){
   this.calc();
  }
calc(){
  this.stars = [];
  let tmp = this.value;
  for (let i=0; i<this.numStars; i++, tmp--){
   if(tmp >= 1)
   this.stars.push("star");
   else if (tmp > 0 && tmp < 1)
    this.stars.push("star-half");
   else  this.stars.push("star-outline"); 
  }
}


  starClicked(index){
    if(!this.read){
    //console.log(index);
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
   //this.db.object(`ratings/${this.userID}/likedDishes/${this.dishid}`).set("cake");
  // this.db.list.(`rating/likedDishes/${this.dishid}`).set("cake");
 
 // this.rating.stars_value = 
  
 // this.RatingPath.push(this.rating);

    }
  }
}
