import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesEnum} from "@utils/enums";
import {RoleGuard} from "@utils/guards";

const routes: Routes = [
  {
    path: 'teacher-distributions',
    loadChildren: () => import('./teacher-distribution/teacher-distribution.module').then(m => m.TeacherDistributionModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.TEACHER]}
  },
  {
    path: 'teacher-evaluations',
    loadChildren: () => import('./teacher-evaluation/teacher-evaluation.module').then(m => m.TeacherEvaluationModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.TEACHER]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
