import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from "./shared/auth/auth-guard.service";
import { ErrorPageComponent } from './auth/error/error-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'farmer/dashboard/dashboard',
    pathMatch: 'full',
  },
  { path: 'farmer', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate : [AuthGuard] },
  { path: 'farmer', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
