import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleComponent } from './pages/google/google.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'google' },
  { path: 'google', component: GoogleComponent },
  { path: 'hidden_login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
