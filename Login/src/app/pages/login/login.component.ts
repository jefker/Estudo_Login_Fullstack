import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario = {} as IUsuario;

  constructor(private loginService: LoginServiceService) { }

  ngOnInit(): void {
  }
  
  public login() {
    this.loginService.login(this.usuario);
  }
}

