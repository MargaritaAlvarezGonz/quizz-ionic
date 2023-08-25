import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  questions: any = [];
  questiontitle: any;
  questionAnswer: any;
  heplAnswer: any;

  //inicializamos en 0 las respuestas, pero necesitamos que vayan cambiando, por lo que vamos a hacer una variable que se llama questionNumber

  questionNumber: any;


   //El serviceApi se tiene que inicializar en el constructor y se importa
  constructor(
    private apiService: ApiService
  ) { }

    //aquí vamos a llamar a las preguntas cuando inicie la aplicacion
  ngOnInit() {
    this.getQuestions();
    this.questionNumber = 0;

  }


  // Esta es la función que va a llamar a la Api, que a su vez, ya solicitó los datos al archivo json

  getQuestions(){
    this.apiService.getQuestions().subscribe(
      (res) => {
        this.questions = res; //nos trae
        this.questiontitle = this.questions[this.questionNumber].question; //al titulo de las preguntas en nuestro json se llaman question
        this.questionAnswer = this.questions[this.questionNumber].answer;
        this.heplAnswer = this.questions[this.questionNumber].help;
      }, (err) => {
        console.log("error: ", err)
      }
    )
  }

}
