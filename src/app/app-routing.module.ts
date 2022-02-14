import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts children routing
import { USER_LAYOUT } from './routes/user-layout.routing';
import { ADMIN_LAYOUT } from './routes/admin-layout.routing';
import { LEADER_CAM_LAYOUT } from './routes/leader-cam-layout.routing';
import { SUPERVISOR_LAYOUT } from './routes/supervisor.routing';

// layout components 
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { LeaderCamLayoutComponent } from './shared/layouts/leader-cam/leader-cam.component';
import { SupervisorLayoutComponent } from './shared/layouts/supervisor-layout/supervisor-layout.component';
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
    component: SupervisorLayoutComponent,
    children: SUPERVISOR_LAYOUT
  },
  {
    path: 'leader-cam',
    component: LeaderCamLayoutComponent,
    children: LEADER_CAM_LAYOUT
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
