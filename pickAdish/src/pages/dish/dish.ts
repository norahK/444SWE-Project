import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,AlertController } from 'ionic-angular';
import {Dish} from'../../models/dish';
import { Observable } from 'rxjs/Observable';
import {AngularFireObject, AngularFireDatabase} from 'angularfire2/database'
import{AngularFireAuth}from 'angularfire2/auth';
import firebase from 'firebase';
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
  /*avg: any;
  raters: any;
  dish_name: any;*/
  dishid:string;
  userID: any;

 // arrayDish = [];
 //dish = {} as Dish;

dish : any;

 // rating: number;
  //like: boolean;
  d ={} as Dish;// Observable<any>;
 public Clicked :boolean=false;
 tippath :any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertService: AlertController,
              private db:AngularFireDatabase,
              private authr :AngularFireAuth)
   {
        this.dishid = navParams.get('dishId');
        this.d.key=this.dishid;
        const dishRef:firebase.database.Reference = firebase.database().ref(`dishes/${this.dishid}`);
        dishRef.on('value', personSnapshot => {
         this.d.name = personSnapshot.child('name').val();
         this.d.price = personSnapshot.child('price').val();
         this.d.average_rate = personSnapshot.child('average_rate').val();
         if(this.d.average_rate==null ||this.d.average_rate == 0 )this.d.average_rate=0;
         this.d.occasion = personSnapshot.child('occasion').val();
         this.d.number_of_raters = personSnapshot.child('number_of_raters').val();
         if(this.d.number_of_raters==null ||this.d.number_of_raters == 0 )this.d.number_of_raters=0;
         this.d.shop = personSnapshot.child('shop').val();
         this.d.type = personSnapshot.child('type').val();
        });
        this.tippath = db.database.ref('tips');
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
  public onClick() {
            this.Clicked = !this.Clicked;
        }

  UpdateAverageRating(value){
  var orginal_r = this.d.average_rate * this.d.number_of_raters ;
 var data = {
  number_of_raters: this.d.number_of_raters+ 1,
  average_rate: ((orginal_r + value) / (this.d.number_of_raters+1)).toFixed(2)

 };
this.db.database.ref(`dishes`).child(`${this.dishid}`).update(data);

}

 //  AddRating(rating: number){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishPage');
  }
  addtip(){

    let prompt = this.alertService.create({
      title: `add new tip for ${this.d.name}`,
      inputs: [
        {
          name: 'title',
          placeholder: 'title'
        },
        {
          name: 'body',
          placeholder: 'tip body'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            prompt.dismiss();
            return false;
          }
        },
        {
          text: 'Save',
          handler: data => {
            const id= this.tippath.push().getKey();   //get id then add name loc and .. in saide the id s
            this.tippath.child(id).child('title').set(data.title);
            this.tippath.child(id).child('body').set(data.body);
            this.tippath.child(id).child('user_id').set(this.userID);
            this.tippath.child(id).child('dish').set(this.d.key);


          }
        }
      ]
    });
    prompt.present();
  }
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
       this.db.object(`users/${this.userID}/likedDishes/${this.dishid}`).set(this.d.key);

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
    Loading(message) {
      const loading = this.loadingCtrl.create({
        duration: 500
      });
      loading.onDidDismiss(() => {
        const alert = this.alertService.create({
          subTitle: message,
          buttons: ['Dismiss']
        });
        alert.present();
      });

      loading.present();
    }
    deleteAccount(){
      ///alart

    }
}
