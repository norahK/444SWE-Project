import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  LoadingController,App,ActionSheetController,ToastController,AlertController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireObject,AngularFireDatabase,AngularFireList} from'angularfire2/database';
import {FirebaseListObservable ,FirebaseObjectObservable} from "angularfire2/database-deprecated";
import { WelcomeSlideoPage } from '../welcome-slideo/welcome-slideo';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Tip } from '../../models/tip';
import { Pipe, PipeTransform } from '@angular/core';
import { Platform } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  n:Array<string>;
  constructor(private alert:AlertController ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams) {
  this.onnotification();
}


  ionViewDidLoad() {
  }

  async onnotification(){
    try{
await this.plt.ready();
FCMPlugin.onnotification((data)=>{
this.n.push(data);
this.alert.create({
  message:data.message
}).present();
},(error)=>console.log("error"));

  }catch(e){

  }
  }
}
