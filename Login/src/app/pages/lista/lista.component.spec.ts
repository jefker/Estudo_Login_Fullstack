import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { Observable, of } from 'rxjs';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';

import { ListaComponent } from './lista.component';


const usuarioMock: IUsuario = {
  id: 'a1',
  nome: 'Joao',
  email: 'joao@gmail.com',
  senha: 'joao123',
}

const usuarioListaMock: IUsuario[] = [
  {
    id: 'a1',
    nome: 'Joao',
    email: 'joao@gmail.com',
    senha: 'joao123',
  },

  {
    id: 'a2',
    nome: 'Joao',
    email: 'joao@gmail.com',
    senha: 'joao123',
  },
]

const dialogServiceMock = {
  open(){
    return {
      onClose: of(usuarioMock)
    }
  }
}

describe('ListaComponent', () => {
  let listaComponent: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;
  let service: LoginServiceService;
  let http: HttpTestingController;
  let confirmar: ConfirmationService;
  let message: MessageService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ LoginServiceService, ConfirmationService, MessageService,
        { provide: DialogService, useValue: dialogServiceMock }
      ],
      declarations: [ ListaComponent ],
      imports: [ HttpClientTestingModule, PasswordModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    listaComponent = fixture.componentInstance;
    service = TestBed.inject(LoginServiceService);
    http = TestBed.inject(HttpTestingController);
    confirmar = TestBed.inject(ConfirmationService);
    message = TestBed.inject(MessageService);
    // spy = spyOn(message, 'add');
    fixture.detectChanges();
  });

  it('salvarDados', () => {
    const spy = spyOn(listaComponent, 'listarUsuarios');

    spyOn(service, 'salvarDados').and.returnValue(of(usuarioMock));
    listaComponent.salvarDados(usuarioMock);
    expect(spy).toHaveBeenCalled();
  });

  it('listarUsuarios', () => {
    spyOn(service, 'listarUsuarios').and.returnValue(of(usuarioListaMock));
    listaComponent.listarUsuarios();
    expect(listaComponent.usuarios).toBe(usuarioListaMock);
  });

  it('editarUsuarios', () => {
    const spy = spyOn(listaComponent, 'listarUsuarios');

    spyOn(service, 'editarUsuarios').and.returnValue(of(usuarioMock));
    listaComponent.editarUsuarios('a1', usuarioMock);      // Precisa passar o id e a interface como parametro
    expect(spy).toHaveBeenCalled();
  });

  it('removerUsuario', () => {
    const spy = spyOn(listaComponent, 'listarUsuarios');

    spyOn(service, 'removerUsuario').and.returnValue(of(usuarioMock));
    listaComponent.removerUsuario('a1');   // Precisa passar o id como parametro
    expect(spy).toHaveBeenCalled();
  });

  it('showDynamicDialog', () => {
    listaComponent.usuarios = usuarioListaMock;
    listaComponent.showDynamicDialog('cadastrar', 'a1');
    listaComponent.ref?.close(usuarioMock);
    expect('id').toBe('id');
    expect(listaComponent.usuario.id).toBe('a1');
    expect(listaComponent.dadosSave).toBe(usuarioMock);
  });

  it('showDynamicDialog', () => {
    listaComponent.usuarios = usuarioListaMock;
    listaComponent.showDynamicDialog('editar', 'a1');
    listaComponent.ref?.close(usuarioMock);
    expect('id').toBe('id');
    expect(listaComponent.usuario.id).toBe('a1');
    expect(listaComponent.dadosSave).toBe(usuarioMock);
  });

  it('confirmacaoDialog', () => {
    const spy = spyOn(listaComponent, 'validacaoForm');

    spyOn(confirmar, 'confirm').and.callFake((confirma : any) => confirma.accept());
    listaComponent.confirmacaoDialog('operacao', 'a1')
    expect('id').toBe('id');
    expect(spy).toHaveBeenCalled();
  });

  it('validacaoForm Cadastrar', () => {
    const loginService = TestBed.inject(LoginServiceService);
    const spy = spyOn(message, 'add');

    spyOn(loginService, 'salvarDados').and.callThrough();
    listaComponent.operacao = 'cadastrar';
    listaComponent.validacaoForm();
    expect(loginService.salvarDados).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();

    spyOn(loginService, 'editarUsuarios').and.callThrough();
    listaComponent.operacao = 'editar';
    listaComponent.validacaoForm();
    expect(loginService.editarUsuarios).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    
    spyOn(loginService, 'removerUsuario').and.callThrough();
    listaComponent.operacao = 'deletar';
    listaComponent.validacaoForm();
    expect(loginService.removerUsuario).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
});
