import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ProfileComponent
} from './profile/profile.component';
import { AuthGuard } from '../shared/auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  children: [
    {
    path: "profile",
    component : ProfileComponent,
    canActivate : [AuthGuard],
    data:{
      title: "Profile"
    }
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
