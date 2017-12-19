import { Component } from '@angular/core';
import {  Platform,LoadingController,App,ActionSheetController,NavController,ToastController,AlertController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireObject,AngularFireDatabase,AngularFireList} from'angularfire2/database';
import {FirebaseListObservable ,FirebaseObjectObservable} from "angularfire2/database-deprecated";
import { WelcomeSlideoPage } from '../welcome-slideo/welcome-slideo';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Tip } from '../../models/tip';
import { Pipe, PipeTransform ,Inject} from '@angular/core';
import {DishPage} from '../dish/dish';
import { Dish } from '../../models/dish';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
 // tips: FirebaseListObservable<any>;
  imageUrl="assets/img/avatar.jpg";//:any
  //tipsRef$: FirebaseListObservable<Tip[]>;//Observable<any[]>;
 // tips: FirebaseListObservable<any>;
  private tips= this.db.list<Tip>('tips');//: AngularFireList<any>;
  // : Observable<Tip[]>;
  tipsRef$:Observable<Tip[]>;//AngularFireList<Tip[]>;
dishes :Observable<Dish[]>;
  user :  Observable<User>;// FirebaseObjectObservable<User>;
  userch ='tipslist';
  constructor(public app: App,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private toast:ToastController,
    private authr:AngularFireAuth,
    private db:AngularFireDatabase,
    public navCtrl: NavController) {
      //const unsubscribe =
    // this.tips= this.db.list<Tip>('tips');
      this.authr.authState.subscribe(logedin => {
        if(!logedin||logedin.isAnonymous){
       // this.user=Observable.create(o=>this.user=o );
             //this.user.name="";
          ///go to login page
          return;
        } else {
          this.user= this.db.object(`users/${logedin.uid}`).valueChanges();
          this.getallinfo(logedin.uid);
          this.gitalltips( logedin.uid);
          this.gitalldishes( logedin.uid);
        }
      });
    }
  //  private mySegment: string = 'one';

     //  get (): FirebaseListObservable<any[]>{
  //  return this.db.list('/tips');
async getallinfo(uid){
//this.imageUrl="";
}
  sittings(){
    this.navCtrl.push('SettingsPage');
  }
add(){
    this.navCtrl.push('AddNewDishPage');
  }
delete(tip){
  let deletetip = this.alertCtrl.create({
    title: `do you want to delete ${tip.title} tip?`,
    buttons: [
      {
        text: 'delete', role: 'destructive',
        handler: data => {

         this.db.list('tips').remove(tip.key)//then
  //this.db.list('/tips').remove(tip);//.then()
      }
      },
      {
        text: 'cancle',
         role: 'cancel',
        handler: () => {      }
      }
    ]
  });
  deletetip.present();

}
deletedish(dish){
  let deletetip = this.alertCtrl.create({
    title: `do you want to delete ${dish.title} dish?`,
    buttons: [
      {
        text: 'delete', role: 'destructive',
        handler: data => {

         this.db.list('dishes').remove(dish.key)//then
  //this.db.list('/tips').remove(tip);//.then()
      }
      },
      {
        text: 'cancle',
         role: 'cancel',
        handler: () => {      }
      }
    ]
  });
  deletetip.present();

}
gotoDishpage(dishid){
  this.navCtrl.push(DishPage, {
    dishId: dishid
});
  //there is no shop page yet if no id
 }
 async gitalldishes(uid:string){

  this.dishes = this.db.list('dishes',
  ref => ref.orderByChild('user_id').equalTo(uid)) .snapshotChanges().map(
    changes=>{
      return changes.map(c=>({
        key :c.payload.key,
        ...c.payload.val()
      })

      )
    }
      );

 }
 async gitalltips(uid:string){

  this.tipsRef$ = this.db.list('tips',
  ref => ref.orderByChild('user_id').equalTo(uid))
  .snapshotChanges().map(
changes=>{
  return changes.map(c=>({
    key :c.payload.key,
    ...c.payload.val()
  })

  )
}
  );

  //  this.tips =
//this.tips=this.db.list('tips').snapshotChanges().map(



}



  Loading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

 ionViewWillLoad(){
  const bikeImage = document.getElementById("profile-image") as HTMLImageElement;

  // this.authr.auth.currentUser?this.auther.auth.currentUser.email:null;
7
  this.authr.authState.subscribe(data=>{
    if(data&&data.email&&data.uid){
       this.toast.create({
        message: `welcome to pic a dish app ${data.email}`,
        duration:3000
      }).present();
      }else{
        this.toast.create({
          message: `register to enjoy our app`,
          duration:3000
        }).present();
      }
      }
  );
}
/*get currentUserAnonymous(): boolean {
  return this.authr ? this.authr.authState.anonymous : false
}*/

}
