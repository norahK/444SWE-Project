import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(private fauth:AngularFireAuth,private toast:ToastController,public navCtrl: NavController) {

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
}
