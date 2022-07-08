import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { IUsuario } from '../interface/iusuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(usuario: IUsuario){

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario), {responseType: 'text'}).subscribe(data => {

      /*Retorno Http*/
      console.log(JSON.parse(JSON.stringify(data)));

    })
  }
}
