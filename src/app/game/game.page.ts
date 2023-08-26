import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  questions: any = [];
  wrongAnswers: any = [];
  questiontitle: any;
  questionAnswer: any;
  heplAnswer: any;
  //inicializamos en 0 las respuestas, pero necesitamos que vayan cambiando, por lo que vamos a hacer una variable que se llama questionNumber
  questionNumber: any;
  formSendAnswer: FormGroup;


   //El serviceApi se tiene que inicializar en el constructor y se importa
  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    public alertController: AlertController
  ) {
    this.formSendAnswer= this.formBuilder.group({
      answer: ["", Validators.required],
    });
  }

    //aquí vamos a llamar a las preguntas cuando inicie la aplicacion
  ngOnInit() {

  }

  ionViewWillEnter(){
    this.questionNumber = localStorage.getItem("questionNumber");
    //le vamos a poner un codicionante7
    if (!this.questionNumber){
      this.questionNumber = 0;
    }
    this.getQuestions();
    this.getWrongAnswers();
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

  getWrongAnswers(){
    this.apiService.getWrongAnswers().subscribe(
      (res) => {
        this.wrongAnswers = res; //nos trae

      }, (err) => {
        console.log("error: ", err)
      }
    )
  }

  next(){
    this.questionNumber = ++this.questionNumber;
    // vams a grabar en que pregunta se quedó el usuuario con el local Storage
    localStorage.setItem("questionNumber", this.questionNumber)
    this.getQuestions();
  }

  help(){
    this.presentAlertHelp();
  }


  getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min +1)) + min;
  }

  sendAnswer(){
    let value = this.formSendAnswer.value;//con esto se tiene toda la información de formulario con el que enviamos
    console.log("Respuesta enviada: ", value)
    if (value.answer ==  this.questionAnswer){

      this.presentAlertCorrectAnswer();
    } else {

      this.presentAlertWrongAnswer();
    }
  }

   async presentAlertCorrectAnswer(){
    const alert = await this.alertController.create({
      header: "Respuesta correcta",
      message: "Veremos que tal te va en la siguiente",
      buttons: ["OK"]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.next();
  }

  async presentAlertWrongAnswer(){
    const alert = await this.alertController.create({
      header: "Respuesta incorrecta",
      message: this.wrongAnswers[this.getRandomInt(0, 3)].answer,
      buttons: ["OK"]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.next();
  }

  async presentAlertHelp(){
    const alert = await this.alertController.create({
      header: "Ayuda",
      message: this.heplAnswer,
      buttons: ["OK"]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.next();
  }



}
