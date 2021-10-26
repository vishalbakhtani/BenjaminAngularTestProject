import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // routes
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule) },
            { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule) },
            // Catch all
            { path: '**', redirectTo: 'home' }
        ]
    }
];
