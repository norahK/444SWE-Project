import { Component } from '@angular/core';
import {  ActionSheetController,NavController,ToastController,AlertController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireDatabase,AngularFireList} from'angularfire2/database';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
   tips: AngularFireList<any>;
  constructor(//af: AngularFire,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private fauth:AngularFireAuth,
    private toast:ToastController,
    private db:AngularFireDatabase,
    public navCtrl: NavController) {
     // this.tips = af.database.list('/tips');//change to user tips
  }
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
  this.fauth.authState.subscribe(data=>{
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
logout(user){


}
}
