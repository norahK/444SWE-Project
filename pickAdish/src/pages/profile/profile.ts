import { Component } from '@angular/core';
import {  App,ActionSheetController,NavController,ToastController,AlertController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireObject,AngularFireDatabase,AngularFireList} from'angularfire2/database';
import {FirebaseListObservable ,FirebaseObjectObservable} from "angularfire2/database-deprecated";
import { WelcomeSlideoPage } from '../welcome-slideo/welcome-slideo';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  following = false;

  posts = [
    {
      postImageUrl: 'assets/img/background/background-2.jpg',
      text: `I believe in being strong when everything seems to be going wrong.
             I believe that happy girls are the prettiest girls.
             I believe that tomorrow is another day and I believe in miracles.`,
      date: 'November 5, 2016',
      likes: 12,
      comments: 4,
      timestamp: '11h ago'
    },
    {
      postImageUrl: 'assets/img/background/background-3.jpg',
      text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
      date: 'October 23, 2016',
      likes: 30,
      comments: 64,
      timestamp: '30d ago'
    },
    {
      postImageUrl: 'assets/img/background/background-4.jpg',
      date: 'June 28, 2016',
      likes: 46,
      text: `Hope is the thing with feathers that perches in the soul
             and sings the tune without the words And never stops at all.`,
      comments: 66,
      timestamp: '4mo ago'
    },
  ];
  imageUrl="assets/img/avatar.jpg";//:any

  //user={} as User;
  tips: Observable<any[]>;
  user :  Observable<User>;// FirebaseObjectObservable<User>;
  constructor(public app: App,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private toast:ToastController,
    private authr:AngularFireAuth,
    private db:AngularFireDatabase,
    public navCtrl: NavController) {
      //const unsubscribe =
      this.authr.authState.subscribe(logedin => {
        if(!logedin||logedin.isAnonymous){
       // this.user=Observable.create(o=>this.user=o );
             //this.user.name="";
          ///go to login page
          return;
        } else {
          this.user= this.db.object(`users/${logedin.uid}`).valueChanges();
          this.getallinfo(logedin.uid);
          this.gitalltips( logedin.uid);

        }
      });
    }
     //  get (): FirebaseListObservable<any[]>{
  //  return this.db.list('/tips');
async getallinfo(uid){
//this.imageUrl="";
}
  sittings(){
    this.navCtrl.push('SettingsPage');
  }
add(){
    this.navCtrl.push('AddNewDishPage');
  }
delete(tip){

}
gotoDishpage(id){
 // this.navCtrl.push('SettingsPage');+pass id with it
}
  gitalltips(uid){
    /*   firebase
    .database()
    .ref('/userProfile')
    .child(newUser.uid)
    .set({ email: email });
  });*/
     //this.tips = db.list('/tips').valueChanges();//change to user tipsth
    //this.tips= this.db.list('/tips/');//.only from regester user
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
  const bikeImage = document.getElementById("profile-image") as HTMLImageElement;

  // this.authr.auth.currentUser?this.auther.auth.currentUser.email:null;

  this.authr.authState.subscribe(data=>{
    if(data&&data.email&&data.uid){
       this.toast.create({
        message: `welcome to pic a dish app ${data.email}`,
        duration:3000
      }).present();
      }else{
        this.toast.create({
          message: `register to enjoy our app`,
          duration:3000
        }).present();
      }
      }
  );
}
/*get currentUserAnonymous(): boolean {
  return this.authr ? this.authr.authState.anonymous : false
}*/
logout(): void{
    this.app.getRootNav().setRoot('WelcomeSlideoPage');
 // this.authr.auth.signOut();
 // this.navCtrl.setRoot('WelcomeSlideoPage');
 // const root= this.app.getRootNavs();
//root.popToRoot();
//this.navCtrl.push('WelcomeSlideoPage');//error
}
}
