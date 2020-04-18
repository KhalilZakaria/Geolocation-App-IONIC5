import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { async } from 'q';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

 full_name: string = '';
 phone_number: string = '';
 username: string = '';
 password: string = '';
 confirm_password: string = '';
 e_mail          : string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    ) { }

  ngOnInit() {

  }
  //fonction de redirection vers la page de login 
  formLogin() {
    this.router.navigate(['/login']);
  }
  //la fonction qui teste la validation de la forme de l'email , qui doit etre de la forme exemple@domain , peut etre on doit
  //créer une fonction similaire pour tester la validation du mot de passe
  validate = (e_mail:string) => {
    const expression =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(e_mail).toLowerCase())
};

  
//la fonction qui execute la création d'un nouveau compte , avec le traitement de plusieurs exceptions

  async addRegister() {
    if (this.full_name == '') {
      const toast = await this.toastController.create({
      message: 'Fullname is required',
      duration: 2000
      });
      toast.present();
    } else if (this.phone_number == '') {
      const toast = await this.toastController.create({
        message: 'Phone number is required',
        duration: 2000
        });
      toast.present();
    } else if (this.username == '') {
      const toast = await this.toastController.create({
        message: 'Username is required',
        duration: 2000
        });
      toast.present();

    }
     else if (this.e_mail == '' ) {
      const toast = await this.toastController.create({
        message: 'Entrer un e_mail valide',
        duration: 2000
        });
      toast.present();

    }
    else if (!this.validate(this.e_mail)) {
      const toast = await this.toastController.create({
        message: 'Entrer un e_mail valide',
        duration: 2000
        });
      toast.present();

    } else if (this.password == '') {
      const toast = await this.toastController.create({
        message: 'Password is required',
        duration: 2000
        });
      toast.present();

    } else if (this.password != this.confirm_password) {
      const toast = await this.toastController.create({
        message: 'Password does not match',
        duration: 2000
        });
      toast.present();
    } else {
      let body = {
        full_name: this.full_name,
        phone_number: this.phone_number,
        username: this.username,
        e_mail :this.e_mail,
        password: this.password,
        aksi: 'add_register'
      };
      console.log(body);
      this.postPvdr.postData(body, 'file_aksi.php').subscribe(async data => {
       var alertpesan = data.msg;
       if (data.success) {
         this.router.navigate(['/login']);
         const toast = await this.toastController.create({
          message: 'Register successfully',
          duration: 2000
         });
         toast.present();
       } 
       if (!data.success) {
         const toast = await this.toastController.create({
           message: alertpesan,
           duration: 2000
         });
       }
     });

    }
  }

}
