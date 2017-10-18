import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import{AngularFireAuth}from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user={} as User;

  constructor(private authr:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {

  }
async login(user:User){
  try{
const r=this.authr.auth.signInWithEmailAndPassword(user.email,user.password);
if(r){
  this.navCtrl.push('HomePage');//setRoot +to profile tab
}}catch(e){
  console.error(e);

}
}
register(){this.navCtrl.push('RegisterPage')}

ionViewWillLoad(){
 /*this.OfAuth.outhState.subscribe(data=>{
    if(data.email &&data.uid){
      this.toast.create({
        message:'wecome',${data,email},duration:3000
      }).present();
    }else{

    }
  })*/
      console.log('ionViewDidLoad LoginPage');
    }

}
