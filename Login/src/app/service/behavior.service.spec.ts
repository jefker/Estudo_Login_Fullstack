import { TestBed } from '@angular/core/testing';
import { IToast } from '../interface/itoast';

import { BehaviorService } from './behavior.service';

const dadosMock: IToast = {
  codigo: 0,
  mensagem: '',
}

describe('BehaviorService', () => {
  let service: BehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BehaviorService ]
    });
    service = TestBed.inject(BehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testando toast', () => {
    const toastData = service['toastData'];

    service.setToast(dadosMock);
    expect(toastData.next).toHaveBeenCalled();
  });
});
