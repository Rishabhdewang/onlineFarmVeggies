import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

// import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Home_ROUTES } from "./shared/routes/home-layout.routes";
import { HomeComponent } from './home/home/home.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { LoginComponent } from './auth/login/login.component';

// import { AuthGuard } from "./shared/auth/auth-guard.service";

const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  { path: '', component: HomeLayoutComponent, data: { title: 'Home Views' },children: Home_ROUTES },
  { path: '', component: FullLayoutComponent, data: { title: 'Full Views' }, children: Full_ROUTES },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
