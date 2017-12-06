import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
<<<<<<< HEAD

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
=======
  n:Array<string>;
  constructor(private alert:AlertController ,private plt:Platform ,public navCtrl: NavController, public navParams: NavParams) {
  this.onnotification();
}
>>>>>>> 13db5d94ce720029c6a369821f759ada2f74c8b7

  ionViewDidLoad() {
  }

<<<<<<< HEAD
=======
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
>>>>>>> 13db5d94ce720029c6a369821f759ada2f74c8b7
}
