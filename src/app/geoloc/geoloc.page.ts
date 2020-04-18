import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation';
//import { Platform } from 'ionic-angular';
import {AlertController} from '@ionic/angular'
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import {FormGroup, FormBuilder} from '@angular/forms'
import { async } from 'q';

@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.page.html',
  styleUrls: ['./geoloc.page.scss'],
})
export class GeolocPage implements OnInit {
  pos_region:string;
  pos_ville:string
  pos_POI:string;
  lat :string;
  lon :string;
  e_mail: string;
  anggota: any;
  limit: number = 10;
  start: number = 0;
  username : string;
  POI_position:string;

  constructor(
    //platform: Platform,
    public alert : AlertController,
    public geolocation :Geolocation,
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private storage: Storage,
    ) {
    

     }


  ngOnInit() {
  }

  //si l'utilisateur n'a pas déconnecter dans son utilisation précedente , on le connecte directement .
  ionViewWillEnter() {
    
    this.start = 0;
    this.storage.get('session_storage').then((res) => {
      this.anggota = res;
      this.e_mail = this.anggota.e_mail;
      this.username = this.anggota.username;
    });
  }

  //la fonction pour ce déconnecter et renvois vers la page login , avant on vide le stockage .
  async proseslogout() {
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastController.create({
      message: 'Logout successful',
      duration: 2000
     });
    toast.present();

  }



 //la fonction qui return un alert box , elle n'est pas utilisée pour le moment .

async showAlert(header: string,message:string){
  const alert = await this.alert.create({
    header,
    message,
    buttons : ["OK"]


  })
    await alert.present()

}





//la fonction qui return une chaine de caractère qui est une phrase contenant la latitude et la longitude ,
//puis elle appelle la fonction chargé de la connection avec la base de donnèes .
GrabPosition(){
this.geolocation.getCurrentPosition({ enableHighAccuracy: true,timeout: 15000,maximumAge: 0
}).then((resp) => {
  this.lat=resp.coords.latitude.toString(10)
  this.lon=resp.coords.longitude.toString(10)
  this.POI_position='latitude : '+ this.lat + '       longitude : ' +this.lon

  //le code
  const pos_region = this.pos_region
  const pos_ville = this.pos_ville
  const pos_POI =  this.pos_POI
if (this.pos_POI != '' && this.pos_ville != '') {
    let body = {
        pos_region : this.pos_region,
        pos_ville : this.pos_ville,
        pos_POI : this.pos_POI,
        latitude: resp.coords.latitude.toString(10),
        longitude: resp.coords.longitude.toString(10),
        e_mail: this.e_mail,
        aksi: 'addPosition',
        //pos_POI : this.pos_POI,
    };


  this.postPvdr.postData(body, 'file_aksi.php').subscribe(async data => {
     var alertu = data.msg;
     console.log('iam herrrrrrre');
     if (data.success) {
      //this.storage.set('session_storage', data.result);
       const toast = await this.toastController.create({
        message: 'this is your position !',
        duration: 2000
       });
       toast.present();
     } else {
       const toast = await this.toastController.create({
         message: alertu,
         duration: 2000
       });
       toast.present();
     }
   });

  }
  //fin code
 }).catch((error) => {
   console.log('Error getting location', error);
 });
 let watch = this.geolocation.watchPosition();
 watch.subscribe((data) => {

 });
 //return this.POI_position
}
















//fonction qui retourne juste l'altitude.

GrabLat(){
  this.geolocation.getCurrentPosition({ enableHighAccuracy: true,timeout: 15000,maximumAge: 0
  }).then((resp) => {
    this.lat=resp.coords.latitude.toString(10)
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
  
   });
   return this.lat
  }














//la fonction qui retourne juste la longitude
GrabLon(){
   this.geolocation.getCurrentPosition({ enableHighAccuracy: true,timeout: 15000,maximumAge: 0
  }).then((resp) => {
     this.lon=resp.coords.longitude.toString(10)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
   let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    });
     return this.lon
    }

    
  }

