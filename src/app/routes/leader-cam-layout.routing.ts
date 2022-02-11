import { Routes } from '@angular/router';

export const LEADER_CAM_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../dashboard-ledercam/dashboard-ledercam.module').then( m => m.DashboardLedercamModule )
    }
]