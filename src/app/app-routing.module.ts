import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADMIN_LAYOUT } from './routes/admin-layout-routes';
import { SUPERVISOR_LAYOUT } from './routes/supervisor.routing';
import { USER_LAYOUT } from './routes/user-layout-routes';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './shared/layouts/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: ADMIN_LAYOUT
  },
  {
    path: 'dashboard',
    component: UserLayoutComponent,
    children: USER_LAYOUT
  },

  {
    path: 'supervisor',
    component: UserLayoutComponent,
    children: SUPERVISOR_LAYOUT
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
