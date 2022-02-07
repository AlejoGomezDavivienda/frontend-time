import { Routes } from '@angular/router';

export const SUPERVISOR_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../dashboard-supervisor/dashboard-supervisor.module').then( m => m.DashboardSupervisorModule )
    }
]