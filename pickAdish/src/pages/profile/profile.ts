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

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  imageUrl="assets/img/avatar.jpg";//:any
  //tipsRef$: FirebaseListObservable<Tip[]>;//Observable<any[]>;
 // tips: FirebaseListObservable<any>;
  public tips= this.db.list<Tip>('tips');//: AngularFireList<any>;
  tipsRef:Observable<any>;//AngularFireList<Tip[]>;
  user :  Observable<User>;// FirebaseObjectObservable<User>;
  dishes:Observable<any>;//
  userch: string = 'tipslist';

  constructor(public app: App,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private toast:ToastController,
    private authr:AngularFireAuth,
    private db:AngularFireDatabase,
    public navCtrl: NavController) {
    // this.tips= this.db.list<Tip>('tips');
   // const unsubscribe =
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
        }
      });
   // if(unsubscribe!==null)  unsubscribe.unsubscribe();

    }

     //  get (): FirebaseListObservable<any[]>{
  //  return this.db.list('/tips');
async getallinfo(uid){//this.imageUrl="";
}
sittings(){
    this.navCtrl.push('SettingsPage');}
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
          this.tips.remove(tip.$key)//then
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
    dishid: dishid
});
  //there is no shop page yet if no id
 }
 async gitalltips(uid:string){

  this.tipsRef = this.db.list('tips',
  ref => ref.orderByChild('user_id').equalTo(uid)).valueChanges();
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
