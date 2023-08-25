import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //hay que inicializar la petición de http client
  constructor(
    private http: HttpClient
  ) { }

  getQuestions(){
    return this.http.get('../../assets/files/questions.json').pipe(
      map((res: any) => {
        return res.data;
      }) // Con el mapeo nos trae directamente los datos que estan dentro del json
    );
  }
  // luego, vamos a hacer la petición a este servicio, el de getQuestions que creamos
  //y se hace desde la pagina del juego para obtener todas las preguntas

  getWrongAnswers(){
    return this.http.get('../../assets/files/wrongAnswers.json'). pipe(
      map((res: any)=>{
        return res.data;
      }
      )
    )
  }

}

