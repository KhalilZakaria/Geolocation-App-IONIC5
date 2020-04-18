import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 e_mail: string = '';
 password: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private storage: Storage,
    ) { }

  ngOnInit() {

  }

  // redirection vers la page de register.ts (pour créer un compte)

  formRegister() {
    this.router.navigate(['/register']);
  }

  // la fonction nécessaire pour effectuerpost le login (connexion de l'utilisatur à son compte)
  async proseslogin() {
    if (this.e_mail != '' && this.password != '') {
      let body = {
        e_mail: this.e_mail,
        password: this.password,
        aksi: 'login'
      };
      //console.log(body)
      //appel de la fonction qui permet la connexion entre l'application et le serveur
      this.postPvdr.postData(body,'file_aksi.php').subscribe(async data => {
       var alertpesan = data.msg;
       if (data.success) {
         //enregistrement des données dans le stockage interne pour se connecter directemet au compte dans une
         //utilisation suivante.
         this.storage.set('session_storage', data.result);
         this.router.navigate(['/geoloc']);
         const toast = await this.toastController.create({
          message: 'Welcome!',
          duration: 2000
         });
         toast.present();
       } else {
         const toast = await this.toastController.create({
           message: alertpesan,
           duration: 2000
         });
         toast.present();
       }
     });

    } else {
      const toast = await this.toastController.create({
        message: 'Username or password invalid',
        duration: 2000
      });
      toast.present();
    }

    this.e_mail = '';
    this.password = '';

    }
  }
