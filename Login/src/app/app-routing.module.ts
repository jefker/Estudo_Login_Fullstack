import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListaComponent } from './pages/lista/lista.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'cadastrar', component: CadastroComponent},
  {path:'lista', component: ListaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
