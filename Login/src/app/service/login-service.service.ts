import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { IUsuario } from '../interface/iusuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  api = `${environment.api}/api/usuario`;

  reqHeader:HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
  })

  constructor(private http: HttpClient) { }

  login(usuario: IUsuario){
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario), {responseType: 'text'});
  }

  salvarDados(request: IUsuario) {
    return this.http.post<IUsuario>(`${this.api}/salvar`, request);
  }

  listarUsuarios() {
    return this.http.get<IUsuario[]>(`${this.api}/listar`, {headers: this.reqHeader});
  }

  editarUsuarios(request: IUsuario, id: string) {
    return this.http.patch<IUsuario>(`${this.api}/editar/${id}`, request);
  }

  removerUsuario(id: string) {
    return this.http.delete<IUsuario>(`${this.api}/deletar/${id}`);
  }
}
