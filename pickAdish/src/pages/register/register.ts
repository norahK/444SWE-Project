import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireDatabase}from 'angularfire2/database';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user ={} as User;

constructor(private afauth: AngularFireAuth,public afd:AngularFireDatabase,
public navCtrl: NavController, public navParams: NavParams) {

}
  register(user:User){
    //add PW confrmation
    const result =this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
    if(result){
      this.afd.list('/users/').push(user);//push({titl: data.title}//.push(user));

    }else{
      //exesting account
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
