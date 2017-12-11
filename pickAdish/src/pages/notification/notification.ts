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
  n:Array<string>;
  constructor(
   // private alert:AlertController ,
   // private plt:Platform ,
    public navCtrl: NavController,
     public navParams: NavParams) {
  //this.onnotification();
}

  ionViewDidLoad() {
  }

  /*async onnotification(){
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
  }*/
}
