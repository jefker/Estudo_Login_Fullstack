import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { IToast } from 'src/app/interface/itoast';
import { BehaviorService } from 'src/app/service/behavior.service';

import { ToastComponent } from './toast.component';

const dadosMock: IToast = {
  codigo: 0,
  mensagem: '',
}

const serviceMock = {
  add(){}
}

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      providers: [ {
        provide: MessageService,
        useValue: serviceMock
      }, BehaviorService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mensagens toast', () => {
    const service = TestBed.inject(MessageService)
    const spy = spyOn(service, 'add');

    dadosMock.codigo = 200;
    component.dados = dadosMock;
    component.mensagem();
    expect(spy).toHaveBeenCalled();

    dadosMock.codigo = 400;
    component.dados = dadosMock;
    component.mensagem();
    expect(spy).toHaveBeenCalled();

    dadosMock.codigo = 500;
    component.dados = dadosMock;
    component.mensagem();
    expect(spy).toHaveBeenCalled();
  });

});
