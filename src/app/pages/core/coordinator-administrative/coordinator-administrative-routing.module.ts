import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoleGuard} from "@utils/guards";
import {RolesEnum} from "@utils/enums";

const routes: Routes = [
  {
    path: 'enrollments',
    loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.COORDINATOR_ADMINISTRATIVE]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorAdministrativeRoutingModule { }
