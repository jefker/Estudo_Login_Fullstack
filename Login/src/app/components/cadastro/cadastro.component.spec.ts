import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PasswordModule } from 'primeng/password';
import { of } from 'rxjs';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';

import { CadastroComponent } from './cadastro.component';


class ComponentMock {}

const usuarioMock: IUsuario = {
  id: 'a1',
  nome: 'Joao',
  email: 'joao@gmail.com',
  senha: 'joao123',
}

describe('CadastroComponent', () => {
  let cadastroComponent: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let service: LoginServiceService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ LoginServiceService ],
      declarations: [ CadastroComponent ],
      imports: [ RouterTestingModule.withRoutes([
        { path: '', component: ComponentMock }
      ]), HttpClientTestingModule, FormsModule, ReactiveFormsModule, PasswordModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    cadastroComponent = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(LoginServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const spy = spyOn(router, 'navigate'); // Chamando rota referenciando this.router.navigate([''])

    spyOn(service, 'salvarDados').and.returnValue(of(usuarioMock)); // Retornando valor do usuarioMock 
    cadastroComponent.salvarDados(); // Chamando a função para salvar dados
    expect(spy).toHaveBeenCalledWith(['']); // Espero que a rota seja chamada com ''
  });
});
