import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],

  imports: [
    CommonModule,
  ],

  exports: [
    TableModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ToastModule
  ],

  providers: [
    ConfirmationService,
    MessageService
  ]

})

export class PrimengModule { }
