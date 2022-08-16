import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-users', routerLink: ''},
      {label: 'Usuários', icon: 'pi pi-fw pi-users', routerLink: 'lista'}
    ]
  }

}
