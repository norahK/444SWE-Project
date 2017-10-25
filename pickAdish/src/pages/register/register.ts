import { Component } from '@angular/core';
import { AlertController,LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
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

constructor( public loadingCtrl: LoadingController, public alertCtrl: AlertController,private afauth: AngularFireAuth,public afd:AngularFireDatabase,
public navCtrl: NavController, public navParams: NavParams) {

}
async register(user:User){
    //add PW confrmation
try{
    const result =this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password).
    then((success)=>{ this.afd.list('/users/').push(user);//push({titl: data.title}//.push(user));
  this.Loading('regestration compleated sucssusfuly');
  }
  ).catch(function(error) {
this.Loading(error.message);     });
    }
    catch(r){
      this.Loading(r.message);
      //this.Loading(r.message);
    }
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad RegisterPage');
  }
  Loading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
       // title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

}
