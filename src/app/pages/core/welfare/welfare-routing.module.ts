import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";
import {RoleGuard} from "@utils/guards";
import {RolesEnum} from "@utils/enums";

const routes: Routes = [
  {
    path: 'enrollments',
    component: EnrollmentListComponent,
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.WELFARE]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelfareRoutingModule {
}
