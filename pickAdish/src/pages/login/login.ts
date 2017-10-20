import { Component , OnInit, HostBinding } from '@angular/core';
import { AlertController,LoadingController,IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import{AngularFireAuth}from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';
//import { ResetPassword } from '../reset-password/reset-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user={} as User;
public loginForm;
loading: any;
//public backgroundImage = 'assets/img/background/background-6.jpg';
  constructor(    public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
    private authr:AngularFireAuth,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
     public navParams: NavParams) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
async login(user:User){
  try{
const r=this.authr.auth.signInWithEmailAndPassword(user.email,user.password);
if(r){
  this.navCtrl.push(TabsPage);//ProfilePage);//setRoot +to profile tab
}else{
  this.Loading('user name or passord incorrict');
}}catch(e){
  this.Loading(e);
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
    resetPassword() {


      this.Loading('An e-mail was sent with your new password.');
    }
}
