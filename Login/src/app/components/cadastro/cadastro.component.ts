import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router) {
      this.formGroup = this.fb.group({
        nome: this.fb.control(''),
        email: this.fb.control('', [Validators.required]),
        senha: this.fb.control('', [Validators.required])
      });
    }

  ngOnInit(): void {
  }

  salvarDados(): void {
    const valor = this.formGroup.value;
    const request: IUsuario = {
      ... valor,
    };

    this.loginService.salvarDados(request).subscribe(retorna => {
      this.router.navigate([''])
    });
  }

}
