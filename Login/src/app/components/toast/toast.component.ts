import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IToast } from 'src/app/interface/itoast';
import { BehaviorService } from 'src/app/service/behavior.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})

export class ToastComponent implements OnInit {

  dados = {} as IToast;

  constructor(
    private behavior: BehaviorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.behavior.getToast().subscribe(data => {
      this.dados = data;
      this.mensagem()
    });
  }

  mensagem() {
    if(this.dados.codigo >= 200 && this.dados.codigo <= 202){
      this.messageService.add({severity:'success', summary: 'Successo', detail: `${this.dados.mensagem}`, key: 'tr'});
    }
    
    else if(this.dados.codigo >= 400 && this.dados.codigo <= 451) {
      this.messageService.add({severity:'error', summary: 'Erro no Cliente', detail: `${this.dados.mensagem}`, key: 'tr'});
    }

    else if(this.dados.codigo >= 500 && this.dados.codigo <= 511) {
      this.messageService.add({severity:'warn', summary: 'Erro no Servidor', detail: `${this.dados.mensagem}`, key: 'tr'});
    }
  }
}

