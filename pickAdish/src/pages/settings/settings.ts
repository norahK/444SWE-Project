import { Component } from '@angular/core';
import { App,LoadingController,IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import{ AngularFireAuth}from 'angularfire2/auth';
import{ AngularFireObject,AngularFireDatabase,AngularFireList} from'angularfire2/database';
import {FirebaseListObservable ,FirebaseObjectObservable} from "angularfire2/database-deprecated";
import { WelcomeSlideoPage } from '../welcome-slideo/welcome-slideo';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  profilePicture: string;
  profileRef: any;
  errorMessage: any;
  placeholderPicture = 'assets/img/avatar.jpg';

  enableNotifications = true;
  language: any;
  currency: any;
  paymentMethod: any;

  user={} as User;
  //user :  Observable<User>;// FirebaseObjectObservable<User>;
  authState: any = null;
  constructor(public app: App,
    public alertService: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public camera: Camera, private authr:AngularFireAuth,
    private db:AngularFireDatabase,
    public navCtrl: NavController
  ) {

//get user info
this.authr.authState.subscribe(logedin => {
  this.authState=logedin;
  if(!logedin||logedin.isAnonymous){
 // this.user=Observable.create(o=>this.user=o );
       //this.user.name="";
    ///go to login page
    return;
  } else {

    const personRef: firebase.database.Reference = firebase.database().ref(`/users/${logedin.uid}`);
    personRef.on('value', personSnapshot => {
      this.user.id=logedin.uid;
      this.user.name = personSnapshot.child('name').val();
      this.user.bio = personSnapshot.child('bio').val();
      this.user.profileImage = personSnapshot.child('profileImage').val();
      this.user.email = personSnapshot.child('email').val();

    });
    //= this.db.object(`users/${logedin.uid}`).valueChanges();

  }
});

   }

  save() {
    this.authr.authState.subscribe(logedin => {
    //this.authState.updatePassword(this.user.password);
    logedin.updateEmail(this.user.email);
      this.db.object(`users/${this.user.id}`).update(this.user)
      .then(data =>
        this.Loading("saved yaaay"))
      .catch(error => this.Loading(error));

      });
  }

  updateImage(value) {
    this.profilePicture = 'data:image/jpeg;base64,' + value.val();
  }

  updateProfileImage() {
        //go to camera or galary
    this.camera.getPicture({
      quality: 50,
      allowEdit: true,
      cameraDirection: this.camera.Direction.FRONT,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.user.profileImage = imageData;
    }, (err) => {
    //  this.toastCtrl.create('Error: ' + err);
    });
  }
  resetPassword() {
    let alert = this.alertService.create({
      title:'enter your email',
        inputs:[
          {
            name:'recoverEmail',
            placeholder:'email'
          },
        ],
        buttons: [
            {
                text: "send",
                handler: data=> {
         this.authr.auth.sendPasswordResetEmail(data.recoverEmail)
                  .then(()=>{
                            this.navCtrl.popToRoot();
                    this.Loading('email sended, check your email ');})
                  .catch((err)=>{
                    this.navCtrl.popToRoot();
                    this.Loading(err.message);
                  });
            }
            },
            {
              text: "cancel",
              role: 'Dismiss'

          }
        ]
    });
    alert.present();

}

  logOut() {
    //alart
    let alert = this.alertService.create({
      title:'are you sure you want to sign out ',
        buttons: [
            {
                text: "yes",
                handler: data=> {
                  this.authr.auth.signOut();
                  this.app.getRootNav().setRoot('WelcomeSlideoPage');

                        }
            },
            {
              text: "cancel",
              role: 'Dismiss'

          }
        ]
    });
    alert.present();

   /* this.alertService.presentAlertWithCallback('Are you sure?',
      'This will log you out of this application.').then((yes) => {
        if (yes) {

          this.navCtrl.setRoot('WelcomeSlideoPage');
        }
      });*/
  }
  ionViewDidLoad() {
  }
  Loading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.onDidDismiss(() => {
      const alert = this.alertService.create({
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }
  deleteAccount(){
    ///alart

  }

}
