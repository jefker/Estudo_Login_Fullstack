import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IUsuario } from '../interface/iusuario';

import { LoginServiceService } from './login-service.service';

const usuarioMock: IUsuario = {
  id: 'a1',
  nome: 'Joao',
  email: 'joao@gmail.com',
  senha: 'joao123',
}

describe('LoginServiceService', () => {
  let service: LoginServiceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LoginServiceService,
      { provide: 'url',
        useValue: 'apiurl'
      }]
    });
    service = TestBed.inject(LoginServiceService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { 
    http.verify(); 
   });

   it('login', () => {
    service.login(usuarioMock).subscribe(res => {});
    const req = http.expectOne(`${service.api}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.responseType).toEqual('json');
   });

  it('salvarDados', () => {
    service.salvarDados(usuarioMock).subscribe(res => {});
    const req = http.expectOne(`${service.api}/salvar`);
    expect(req.request.method).toBe('POST');
    expect(req.request.responseType).toEqual('json');
  });

  it('listarUsuarios', () => {
    service.listarUsuarios().subscribe(res => {});
    const req = http.expectOne(`${service.api}/listar`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(usuarioMock);
  });

  it('editarUsuario', () => {
    service.editarUsuarios(usuarioMock, 'a1').subscribe(res => {});
    const req = http.expectOne(`${service.api}/editar/a1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
  })

  it('removerUsuario', () => {
    service.removerUsuario('a1').subscribe(res => {});
    const req = http.expectOne(`${service.api}/deletar/a1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
  })
});
