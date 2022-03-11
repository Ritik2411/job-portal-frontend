import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddEmployeerDetailComponent } from './components/add-employeer-detail/add-employeer-detail.component';
import { AddVacancyComponent } from './components/add-vacancy/add-vacancy.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { JobseekerVacancyComponent } from './jobseeker-vacancy/jobseeker-vacancy.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },

  {
    path: "login",
    component : LoginComponent
  },

  {
    path: "register",
    component: RegisterComponent
  },

  {
    path: 'account/:id',
    component: AccountComponent
  },

  {
    path: 'changepassword/:id',
    component: ChangepasswordComponent
  },

  {
    path: 'employeedetails/:id',
    component: AddEmployeeComponent
  },

  {
    path: 'postvacancies/:id',
    component: AddVacancyComponent
  },

  {
    path: 'vacancies/:id',
    component: VacanciesComponent
  },

  {
    path: 'allvacancies',
    component: JobseekerVacancyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
