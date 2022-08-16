import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToast } from '../interface/itoast';


@Injectable({
  providedIn: 'root'
})

export class BehaviorService {

  private toastData = new BehaviorSubject<IToast>({codigo: 0, mensagem: ''});

  constructor() { }

  setToast (toast: IToast): void {
    this.toastData.next(toast);
  }

  getToast(): Observable<IToast> {
    return this.toastData.asObservable();
  }
}
