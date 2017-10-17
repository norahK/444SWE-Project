import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
const r=this.authr.auth.signInWithEmailAndPassword(user.email,user.password);
if(r){
  this.navCtrl.push('TabsPage');//setRoot
}
}
register(){this.navCtrl.push('RegisterPage')}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
