import { Routes } from '@angular/router';

export const ADMIN_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardModule )
    }
]