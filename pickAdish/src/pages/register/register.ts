import { Component } from '@angular/core';
import { AlertController,LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireDatabase}from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
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
u: Observable<firebase.User>;

constructor( public loadingCtrl: LoadingController, public alertCtrl: AlertController
  ,private afauth: AngularFireAuth
  ,public afd:AngularFireDatabase,
public navCtrl: NavController
, public navParams: NavParams) {
  this.u = this.afauth.authState;

}
async register(user:User){
    //add PW confrmation
try{
   this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password).
    then((success)=>{
       this.afd.object(`users/${this.afauth.auth.currentUser.uid}`).set(this.user)
       .then(()=>
        this.Loading('regestration compleated sucssusfuly'));
    // ) ;//push({titl: data.title}//.push(user));
    //this.afauth.auth.currentUser.uid
  }
  ).catch((err)=>{this.Loading(err);
  }
);
    }
    catch(r){
      this.Loading(r.message);
      //this.Loading(r.message);
    }
  }
  ionViewDidLoad() {
  }
  async Loading(message) {
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
  sendEmailVerification() {//later
    this.afauth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
this.Loading('email vervication has sended to your email ')        })
      });
  }

}
