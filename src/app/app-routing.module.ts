import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddEmployeerDetailComponent } from './components/add-employeer-detail/add-employeer-detail.component';
import { AddVacancyComponent } from './components/add-vacancy/add-vacancy.component';
import { AppliedvacanciesComponent } from './components/appliedvacancies/appliedvacancies.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { EmployeeDataComponent } from './components/employee-data/employee-data.component';
import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QulificationDetailsComponent } from './components/qulification-details/qulification-details.component';
import { RegisterComponent } from './components/register/register.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { JobseekerVacancyComponent } from './jobseeker-vacancy/jobseeker-vacancy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RequestReceivedComponent } from './request-received/request-received.component';

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
    path: 'allvacancies/:id',

    children: [
      {
        path: '',
        component: JobseekerVacancyComponent,
      },
      
      {
        path: 'employeedetails/:id',
        component: EmployeeDataComponent
      }
    ]
  },

  {
    path: 'appliedvacancies/:id',
    component: AppliedvacanciesComponent
  },

  {
    path: 'vacanciesRequests/:id',
    component: RequestReceivedComponent
  },

  {
    path: ':id/details',
    component: JobseekerDetailsComponent,
  },

  {
    path: ':id/experience',
    component: ExperienceDetailsComponent
  },

  {
    path: ':id/qualification',
    component: QulificationDetailsComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
