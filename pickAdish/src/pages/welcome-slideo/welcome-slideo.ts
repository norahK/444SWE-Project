import {ViewChild , Component , OnInit, HostBinding } from '@angular/core';
import {Slides , AlertController,LoadingController,IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import{AngularFireAuth}from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-welcome-slideo',
  templateUrl: 'welcome-slideo.html',

})
export class WelcomeSlideoPage {
  user={} as User;
  loading: any;
  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [1,2,3];
  constructor(  public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
   private authr:AngularFireAuth,
   public navCtrl: NavController,
   public formBuilder: FormBuilder,
    public navParams: NavParams) {
 }

  ionViewDidLoad() {
/*this.OfAuth.outhState.subscribe(data=>{
    if(data.email &&data.uid){
      this.toast.create({
        message:'wecome',${data,email},duration:3000
      }).present();
    }else{

    }
  })*/  }
  async onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }
  async login(user:User){
    try{
  const r=this.authr.auth.signInWithEmailAndPassword(user.email,user.password)
  .then((success)=>{
    this.navCtrl.setRoot(TabsPage);//ProfilePage);// +to profile tab
  })
  .catch(
    (err)=>{this.Loading(err);
    }
  );}
  catch(r){
    this.Loading(r.message);
  }
  }

  register(){this.navCtrl.push('RegisterPage')}
  skip() {
    //anonmis login
     this.authr.auth.signInAnonymously()
     .then((success)=>{this.navCtrl.setRoot(TabsPage);
     }).catch(function(error) {
    this.Loading (error.message);
    });
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
   /*   this.authr.auth.resetPassword(this.resetPasswordForm.value.email).then((user) => {
          let alert = this.alertCtrl.create({
              message: "We just sent you a reset link to your email",
              buttons: [
                  {
                      text: "Ok",
                      role: 'cancel',
                      handler: () => {
                          this.nav.pop();
                      }
                  }
              ]
          });
          alert.present();

      }, (error) => {
          var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                  {
                      text: "Ok",
                      role: 'cancel'
                  }
              ]
          });
          errorAlert.present();
      });*/
    this.Loading('An e-mail was sent with your new password.');
  }
}
