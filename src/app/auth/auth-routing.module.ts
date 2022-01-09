import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleComponent } from './pages/google/google.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'google'
  },
  // Login
  {
    path: 'hidden_login',
    component: LoginComponent
  },
  {
    path: 'google',
    component: GoogleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
