import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router,
    public alertController: AlertController
  ) {}


  //Función para hacer el clikc en los botones y que nos lleve a la página
  start(){
    this.presentAlertStart();
   
  }

  continue(){
    this.router.navigate(["/game"]) ;
  }

  async presentAlertStart(){
    const alert = await this.alertController.create({
      header: "¿Deseas comenzar de cero?",
      message: "Si estás seguro en comenzar de cero, todo tu progreso se perderá",
      buttons: [{
        text: "SI",
        handler: ()=> {
          localStorage.setItem("questionNumber", "0");
          this.router.navigate(["/game"])
        }
      },
      {
        text: "NO",
        handler: ()=> {

        }
      }
    ]

    });
    await alert.present();
    let result = await alert.onDidDismiss();

  }

}
