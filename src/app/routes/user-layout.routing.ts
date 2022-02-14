import { Routes } from '@angular/router';

export const USER_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardModule )
    }
]