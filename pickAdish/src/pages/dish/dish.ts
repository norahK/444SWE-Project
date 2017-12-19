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


   {
       // this.dish = this.db.object(`dishes/${this.dishid}`);

     this.dishid = navParams.get('dishId');

     ///  this.dishid = "d1";

       this.d= this.db.object(`dishes/${this.dishid}`).valueChanges();

    db.database.ref(`dishes/${this.dishid}`).once('value', (snapshot) => {
      this.avg = snapshot.val().average_rate;
      this.raters = snapshot.val().number_of_raters;
      this.dish_name = snapshot.val().name;
      return false;
    })

  /*this.dish = this.db.object('dishes/1',{ preserveSnapshot: true });
  this.dish.subscribe(snapshot => {
    this.avg = snapshot.val().average_rate;
    this.raters = snapshot.val().number_of_raters;
  });*/

  this.getallinfo(this.dishid);


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

  UpdateAverageRating(value){
  var orginal_r = this.avg * this.raters ;
 var data = {
  number_of_raters: this.raters+ 1,
  average_rate: ((orginal_r + value) / (this.raters+1)).toFixed(2)

 };
   // this.db.object(`dishes/${this.dishid}/number_of_raters`).update(this.raters+1);
  //  this.db.object(`dishes/${this.dishid}/average_rate`).update((this.avg+value)/this.raters);

this.db.database.ref(`dishes`).child(`${this.dishid}`).update(data);

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

      if(this.imgSrc1 == "assets/img/Like.png"){
      this.imgSrc1 = "assets/img/Liked.png";
       this.db.object(`users/${this.userID}/likedDishes/${this.dishid}`).set(this.dish_name);

      //this.db.list(`users/${this.userID}/likedDishes`).set().push('1');
      }
      else {
      this.imgSrc1 = "assets/img/Like.png";
      this.db.list(`users/${this.userID}/likedDishes`).remove(this.dishid);
      }
    }

    log(value){
     console.log(value);
     this.db.object(`rating`).set({
      dish_id: this.dishid,
      stars_value: value,
      user_id : this.userID
    });
     this.UpdateAverageRating(value);

    }

    button1Color: String = "secondary";
    button2Color: String = "secondary";
    button3Color: String = "secondary";
    button4Color: String = "secondary";

    async selected(id){

      if(id == 1 && this.button1Color == "secondary"){
      this.button1Color = "Primary";
      this.db.object(`dishes/${this.dishid}/occasions/1`).set("family meeting");
    }
      else if(id == 2 && this.button2Color == "secondary"){
      this.button2Color = "Primary";
      this.db.object(`dishes/${this.dishid}/occasions/2`).set("party");
      }
      else if(id == 3 && this.button3Color == "secondary"){
      this.button3Color = "Primary";
      this.db.object(`dishes/${this.dishid}/occasions/3`).set("visitation");
      }
      else if(id == 4 && this.button4Color == "secondary"){
      this.button4Color = "Primary";
      this.db.object(`dishes/${this.dishid}/occasions/4`).set("holiday");
      }
      else if(id == 1 && this.button1Color == "Primary"){
      this.button1Color = "secondary";
      this.db.list(`dishes/${this.dishid}/occasions/1`).remove();
      }
      else if(id == 2 && this.button2Color == "Primary"){
      this.button2Color = "secondary";
      this.db.list(`dishes/${this.dishid}/occasions/2`).remove();
      }
      else if(id == 3 && this.button3Color == "Primary"){
      this.button3Color = "secondary";
      this.db.list(`dishes/${this.dishid}/occasions/3`).remove();
      }
      else if(id == 4 && this.button4Color == "Primary"){
      this.button4Color = "secondary";
      this.db.list(`dishes/${this.dishid}/occasions/4`).remove();
      }
      else ;
    }

}
