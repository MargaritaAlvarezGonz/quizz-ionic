import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router
  ) {}


  //Función para hacer el clikc en los botones y que nos lleve a la página
  start(){
    this.router.navigate(["/game"]) //aqui me salía un error del router, y es porque hay que iniciarlizaarlo en el constructor
  }

}
