import { Component } from '@angular/core';
import {LoadingController,AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import{storage}from 'firebase';
import{Camera,CameraOptions}from'@ionic-native/camera';
import{AngularFireDatabase}from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Dish } from '../../models/dish';
import { Observable } from 'rxjs/Observable';
import{AngularFireAuth}from 'angularfire2/auth';
import { User } from '../../models/user';

//import { TSMap } from "typescript-map"

@IonicPage()
@Component({
  selector: 'page-add-new-dish',
  templateUrl: 'add-new-dish.html',
})
export class AddNewDishPage {
  types: string = "non";
  shops:Observable<any>;
  //cshop :string ="non";
dish={} as Dish;
  //thisdish :Dish ;
shoppath :any ;
dishpath :any;
occs=['party','office','meeting'];
occmap = {party:false,
  office:false,
  meeting:false};
optionsChecked = [];
expanded:boolean= false;
user:any;

  constructor(public db: AngularFireDatabase,
    public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
      private cam:Camera,
    public navCtrl: NavController,
    private authr:AngularFireAuth,
     public navParams: NavParams) {
      this.authr.authState.subscribe(logedin => {
        if(!logedin||logedin.isAnonymous){
       // this.user=Observable.create(o=>this.user=o );
             //this.user.name="";
          ///go to login page
          return;
        } else {
          this.dish.user_id=logedin.uid;

               }
      });
  this.shoppath = db.database.ref('shops');
  this.dishpath = db.database.ref('dishes');

 // this.shops=this.db.list('shops').snapshotChanges();
  this.shops = this.db.list('shops',
  ref => ref.orderByChild('name')).snapshotChanges().map(
    changes=>{
      return changes.map(c=>({
        key :c.payload.key,
        ...c.payload.val()
      })

      )
    }
      );


this.dish.shop="non";
this.dish.name=null;
this.dish.price=null;
this.dish.type="non";
  }

  ionViewDidLoad() {
  }
showCheckboxes() {

    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
     this.expanded = false;
    }
  }

  /*get selectedOptions() { // right now: ['1','3']
  return this.occs
            .filter(opt => opt.checked)
            .map(opt => opt.value)
}?*/
initocc() {
  for (var x = 0; x<this.occs.length; x++) {
      this.occmap[this.occs[x]] = true;
  }
}
updateCheckedOptions(option, event) {
  this.occmap[option] = event.target.checked;
  //add it at the side or under it
}
updateoccs() {
  for(var x in this.occmap) {
      if(this.occmap[x]) {
          this.optionsChecked.push(x);
      }
  }
 }
async takePhoto(){
  try{
const options: CameraOptions={
  quality:50,
  targetHeight:600,
  targetWidth:600,
  destinationType:this.cam.DestinationType.DATA_URL,
  encodingType:this.cam.EncodingType.JPEG,
  mediaType: this.cam.MediaType.PICTURE,
  correctOrientation:true
}
const result= await this.cam.getPicture(options);
const img=`data:image/jpeg;base64,${result}`;
const pic = storage().ref('dish pic');
pic.putString(img,'data_url');
}
catch(e){
  console.error(e);
}
}
addShop(){

  let prompt = this.alertCtrl.create({
    title: 'add new shop',
    message: "Enter shop name ",
    inputs: [
      {
        name: 'name',
        placeholder: 'shop name'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          prompt.dismiss();
          return false;
        }
      },
      {
        text: 'Save',
        handler: data => {
          const id= this.dishpath.push().getKey();   //get id then add name loc and .. in saide the id s
          this.shoppath.child(id).child('name').set(data.name);
          this.dish.shop=id;

        }
      }
    ]
  });
  prompt.present();
}
async submit(dish:Dish){

  if(dish.name==null || dish.price==null || dish.name=="" || dish.price == 0 ){
    this.Loading('you must add name and price');
    return;
  }
  else{
   this.updateoccs();
    this.dish.occasion= this.optionsChecked;
//this.thisdish.name=;
if(this.dish.shop=="non")this.dish.shop=null;
if(this.dish.type=="non")this.dish.type=null;

this.dishpath.push(dish).then((success)=>{

  //this.dishpath.child(this.dish.id).child("id").set(success.getKey());
  this.Loading('added sucessfuly');
//or add othe +cancel
this.back();
},(Error)=>{
  this.Loading('error happend while ading the dish top database');

});
  }

}
Loading(message) {
  const loading = this.loadingCtrl.create({
    duration: 500
  });
  loading.onDidDismiss(() => {
    const alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  });

  loading.present();
}


back(){
  this.navCtrl.pop();
   // window.history.back();

}
/*doCheckbox() {
  const alert = this.alertCtrl.create();
  alert.setTitle('Which occation is propriat for this dish');
  let names = Array.from( this.occ.keys() );
  for(var i=0;i<names.length;i++){
  alert.addInput({
    type: 'checkbox',
    label: names[i],
    value: names[i],
    checked:this.occ.get(names[i])
    });
}
  alert.addButton('Cancel');
  alert.addButton({
    text: 'Okay',
    handler: (data: any) => {
          ///what is this data
          var k=0
          for(var i=0;i<this.occ.size;i++){
            this.occ.set(data.get(k),true);
            k++;
          }
      this.dish.occasion= data;



    }
  });

  alert.present();
}*/

}

