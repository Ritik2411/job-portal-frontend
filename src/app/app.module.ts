import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { AddEmployeerDetailComponent } from './components/add-employeer-detail/add-employeer-detail.component';
import { AddVacancyComponent } from './components/add-vacancy/add-vacancy.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { JobseekerVacancyComponent } from './jobseeker-vacancy/jobseeker-vacancy.component';
import { AppliedvacanciesComponent } from './components/appliedvacancies/appliedvacancies.component';
import { RequestReceivedComponent } from './request-received/request-received.component';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { QulificationDetailsComponent } from './components/qulification-details/qulification-details.component';
import { UpdatequlificationDetailsComponent } from './components/updatequlification-details/updatequlification-details.component';
import { UpdateexperienceDetailsComponent } from './components/updateexperience-details/updateexperience-details.component';
import { UpdatejobseekerDetailsComponent } from './updatejobseeker-details/updatejobseeker-details.component';
import { InterceptorService } from './services/interceptor.service';
import { UploadedCVsComponent } from './uploaded-cvs/uploaded-cvs.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AccountComponent,
    ChangepasswordComponent,
    AddEmployeerDetailComponent,
    AddVacancyComponent,
    VacanciesComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    VacancyComponent,
    JobseekerVacancyComponent,
    AppliedvacanciesComponent,
    RequestReceivedComponent,
    JobseekerDetailsComponent,
    ExperienceDetailsComponent,
    QulificationDetailsComponent,
    UpdatequlificationDetailsComponent,
    UpdateexperienceDetailsComponent,
    UpdatejobseekerDetailsComponent,
    UploadedCVsComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
