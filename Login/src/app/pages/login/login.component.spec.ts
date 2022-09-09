import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';

import { LoginComponent } from './login.component';

class ComponentMock {}

const usuarioMock: IUsuario = {
  id: 'a1',
  nome: 'Joao',
  email: 'joao@gmail.com',
  senha: 'joao123',
}

const token = '123'

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginComponent: LoginComponent;
  let router: Router;
  let service: LoginServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ LoginServiceService ],
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component: ComponentMock }
      ]), HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(LoginServiceService);
    fixture.detectChanges();
  });

  it('testando a função login do componente login', () => {
    spyOn(service, 'login').and.callFake(res => (of (token)));
    const spy = spyOn(loginComponent, 'routerDados').and.callThrough();
    const spy2 = spyOn(router, 'navigate');
    
    loginComponent.usuario = usuarioMock;
    loginComponent.login();
    expect(spy).toHaveBeenCalled();
  });
});
