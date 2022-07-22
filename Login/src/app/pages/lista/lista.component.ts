import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CadastroComponent } from 'src/app/components/cadastro/cadastro.component';
import { IUsuario } from 'src/app/interface/iusuario';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'], 
  providers: [DialogService]
})

export class ListaComponent implements OnInit {

  usuarios: any[] = [];
  ref: DynamicDialogRef | undefined;
  id: string = '';
  dadosSave = {} as IUsuario; //request - salvando dados
  operacao: string = '';

  constructor(
    private loginService: LoginServiceService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.listarUsuarios();
    }
  }

  salvarDados(request: IUsuario){
    this.loginService.salvarDados(request).subscribe(data => this.listarUsuarios());
  }

  listarUsuarios(){
    this.loginService.listarUsuarios().subscribe(data => this.usuarios = data);
  }

  editarUsuarios(id: string, request: IUsuario){
    this.loginService.editarUsuarios(request, id).subscribe(data => this.listarUsuarios());
  }

  removerUsuario(id: string) {
    this.loginService.removerUsuario(id).subscribe(data => this.listarUsuarios());
  }

  showDynamicDialog(op: string, id?: string) {
    
    let usuario = {
      id: "",
      email: "",
      nome: "",
      senha: ""
    } as IUsuario;
    
    if (id) {
      this.id = id;
      usuario = this.usuarios.find(user=>user.id === id);
    };

    this.ref = this.dialogService.open(CadastroComponent, {
      header: op === 'cadastrar'? 'Cadastrar Usuário': 'Editar Usuário',
      width: '25vw',
      height: 'auto',
      data: {
        usuario: usuario
      }
    });

    this.ref.onClose.subscribe(dados => {
      if (dados){
        this.dadosSave = dados;
        this.confirmacaoDialog(op, id);
    }})    
  }

  confirmacaoDialog(op: string, id?: string) {
    this.operacao = op;
    if (id) {
      this.id = id;
    };

    this.confirmationService.confirm({
      message: 'Você tem certeza que quer fazer isso?',
      accept: () => {this.validacaoForm();}
    });
  }

  validacaoForm(){
    if(this.operacao === 'cadastrar'){
      this.salvarDados(this.dadosSave);
      this.messageService.add({severity:'success', summary: 'Cadastro realizado.'});
    }

    if(this.operacao === 'editar'){
      this.editarUsuarios(this.id, this.dadosSave);
      this.messageService.add({severity:'info', summary: 'Usuário atualizado.'});
    }

    if(this.operacao === 'deletar'){
      this.removerUsuario(this.id);
      this.messageService.add({severity:'warn', summary: 'Usuário excluído.'});
    }
  }
}
