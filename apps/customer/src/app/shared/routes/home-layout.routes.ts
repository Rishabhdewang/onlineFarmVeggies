import { Routes, RouterModule } from '@angular/router';

export const Home_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
  }
];
