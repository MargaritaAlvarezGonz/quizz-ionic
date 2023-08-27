import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



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
  message: any;
  questionNumber: any;
  formSendAnswer: FormGroup;
  questionsLength: any;
  questionsTotal: number =32;


   //El serviceApi se tiene que inicializar en el constructor y se importa
  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private router: Router
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
        this.questionsLength = this.questionsTotal;
        console.log("cantidad preguntas " , this.questionsLength)
        this.questiontitle = this.questions[this.questionNumber].question; //al titulo de las preguntas en nuestro json se llaman question
        this.questionAnswer = this.questions[this.questionNumber].answer;
        this.heplAnswer = this.questions[this.questionNumber].help;
      }, (err) => {
        console.log("error: ", err)
        this.presentAlertWin();
        this.router.navigate(["/home"]);
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
    if(this.questionNumber < this.questionsLength){
      this.questionNumber = ++this.questionNumber;
      // vams a grabar en que pregunta se quedó el usuuario con el local Storage
      localStorage.setItem("questionNumber", this.questionNumber)
      this.getQuestions();
    }else {
      this.presentAlertWin();
    }

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
    var message = this.wrongAnswers[this.getRandomInt(0,14)].answer
    const alert = await this.alertController.create({
      header: "Respuesta incorrecta",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
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

  async presentAlertWin() {
    const alert = await this.alertController.create({
      header: "¡Enhorabuena!",
      message: "Has completado todos los niveles, pronto actualizaremos la app con más niveles. También puedes contribuir y ser parte del equipo aportando más preguntas",
      buttons: ["OK"],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
    this.router.navigate(["/home"]) ;
  }



}
