import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  usuario = {} as IUsuario;

  constructor(
    private loginService: LoginServiceService,
    private router: Router
    ) { }

  
  public login() {
    this.loginService.login(this.usuario).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      sessionStorage.setItem('token', data)
      this.routerDados()
    })
  }

  routerDados() {
    this.router.navigate(['/lista']);
  }

}

