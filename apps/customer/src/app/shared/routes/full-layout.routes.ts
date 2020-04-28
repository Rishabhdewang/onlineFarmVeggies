import { Routes, RouterModule } from '@angular/router';

export const Full_ROUTES: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
        },
    {
    path: 'product',
    loadChildren: () => import('../../product/product.module').then(m => m.ProductModule)
    },
    {
        path : 'account',
        loadChildren : ()=> import('../../account/account.module').then(m =>m.AccountModule)
    }
];
