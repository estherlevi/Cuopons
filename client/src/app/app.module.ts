import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {TabMenuModule} from 'primeng/tabmenu';



import { MainPageComponent } from './pages/main-page/main-page.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { AdministratorPageComponent } from './pages/administrator-page/administrator-page.component';
import { AddCompanyComponent } from './core/add-company/add-company.component';
import { UpdateCompanyComponent } from './core/update-company/update-company.component';
import { DeleteCompanyComponent } from './core/delete-company/delete-company.component';
import { AllCompaniesComponent } from './core/all-companies/all-companies.component';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    CustomerPageComponent,
    CompanyPageComponent,
    AdministratorPageComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    AllCompaniesComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,HttpClientModule,
    AppRoutingModule,FormsModule,
    CardModule,ButtonModule,DropdownModule,InputTextModule,ToolbarModule,TabMenuModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
