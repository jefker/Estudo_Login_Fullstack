import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from "primeng/divider";

import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListaComponent } from './pages/lista/lista.component';
import { PrimengModule } from './modules/primeng/primeng.module';
import { SenhaPipe } from './pipe/senha.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ListaComponent,
    SenhaPipe
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    PasswordModule,
    DividerModule,
    PrimengModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
