import { Component } from '@angular/core';
import {  App,ActionSheetController,NavController,ToastController,AlertController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireDatabase,AngularFireList} from'angularfire2/database';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { WelcomeSlideoPage } from '../welcome-slideo/welcome-slideo';
import { User } from '../../models/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user={} as User;
  tips: AngularFireList<any>;
  constructor(public app: App,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private toast:ToastController,
    private authr:AngularFireAuth,
    private db:AngularFireDatabase,
    public navCtrl: NavController) {
     // this.tips = af.database.list('/tips');//change to user tipsth
     if(this.authr.auth.currentUser.isAnonymous)
     {

     }else{
     this.authr.authState.subscribe(res => {
  if (res && res.uid) {
   this.user.email= res.email;
this.user.email=this.authr.auth.currentUser.email;
this.user.id=this.authr.auth.currentUser.uid;
 } else {
    console.log('user not logged in');
  }
});
  }}
  gitalltips(email){
    this.tips= this.db.list('/tips/');//.only from regester user
  }
  showOptions(key,title){
//pop up window to delete or cancele
let deletetip = this.alertCtrl.create({
  title: 'do you want to delete this tip?$title',
  buttons: [
    {
      text: 'delete', role: 'destructive',
      handler: data => {
this.db.list('/tips/').remove(key);//.then()
    }
    },
    {
      text: 'cancle',
       role: 'cancel',
      handler: () => {
        console.log('cancel clicked');
      }
    }
  ]
});
deletetip.present();
}
ionViewWillLoad(){
  this.authr.authState.subscribe(data=>{
    if(data.email){
       this.toast.create({
         message: 'welcome',
         duration:3000

       }).present();
      }else{

      }
      }
  );
}
/*get currentUserAnonymous(): boolean {
  return this.authr ? this.authr.authState.anonymous : false
}*/
logout(){
  this.authr.auth.signOut();
  this.navCtrl.setRoot('WelcomeSlideoPage');
 // const root= this.app.getRootNavs();
//root.popToRoot();
//this.navCtrl.push('WelcomeSlideoPage');//error
}
}
