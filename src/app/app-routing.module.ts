import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
    path:'changepassword/:id',
    component: ChangepasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
