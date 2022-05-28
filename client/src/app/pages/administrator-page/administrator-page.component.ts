import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-administrator-page',
  templateUrl: './administrator-page.component.html',
  styleUrls: ['./administrator-page.component.css']
})
export class AdministratorPageComponent implements OnInit {

  public items: MenuItem[];
  constructor() {

    this.items = [
      {
        label: 'AddCompany', icon: 'pi pi-fw pi-home',
        routerLink: ['AddCompany'],
        routerLinkActiveOptions: '{ exact: true }'
      },
      {
        label: 'UpdateCompany', icon: 'pi pi-fw pi-calendar', routerLink: ['UpdateCompany'],
        routerLinkActiveOptions: '{ exact: true }'
      },
      {
        label: 'DeleteCompany', icon: 'pi pi-fw pi-pencil', routerLink: ['DeleteCompany'],
        routerLinkActiveOptions: '{ exact: true }'
      },
      {
        label: 'AllCompanies', icon: 'pi pi-fw pi-file', routerLink: ['AllCompanies'],
        routerLinkActiveOptions: '{ exact: true }'
      }
    ];
  }

  ngOnInit(): void {

  }

}
