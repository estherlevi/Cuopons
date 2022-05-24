import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

import { MainPageComponent } from './pages/main-page/main-page.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { AdministratorPageComponent } from './pages/administrator-page/administrator-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    CustomerPageComponent,
    CompanyPageComponent,
    AdministratorPageComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,FormsModule,
    CardModule,ButtonModule,DropdownModule,InputTextModule,ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
