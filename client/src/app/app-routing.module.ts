import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCompaniesComponent } from './core/all-companies/all-companies.component';
import { AllCustomersComponent } from './core/all-customers/all-customers.component';
import { AdministratorPageComponent } from './pages/administrator-page/administrator-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginService } from './services/login.service';

const routes: Routes = [

  {
    path: "main", component: MainPageComponent, children: [
      {
        path: "administrator-page", component: AdministratorPageComponent,
        children: [
          { path: "AllCompanies", component: AllCompaniesComponent },
          { path: "AllCustomers", component: AllCustomersComponent },
          { path: "", redirectTo: "AllCompanies", pathMatch: "full" },
          { path: "**", redirectTo: "AllCompanies", pathMatch: "full" },
        ]

      },
      { path: "company-page", component: CompanyPageComponent },
      { path: "customer-page", component: CustomerPageComponent },
      { path: "", redirectTo: "customer-page", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ]
  },
  { path: "login", component: LoginPageComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
