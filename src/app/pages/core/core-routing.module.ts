import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard, TokenGuard} from "@utils/guards";
import {RolesEnum} from "@utils/enums";

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [TokenGuard]
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.TEACHER]}
  },
  {
    path: 'coordinator-administrative',
    loadChildren: () => import('./coordinator-administrative/coordinator-administrative.module').then(m => m.CoordinatorAdministrativeModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.COORDINATOR_ADMINISTRATIVE]}
  },
  {
    path: 'coordinator-career',
    loadChildren: () => import('./coordinator-career/coordinator-career.module').then(m => m.CoordinatorCareerModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.COORDINATOR_CAREER]}
  },
  {
    path: 'rector',
    loadChildren: () => import('./rector/rector.module').then(m => m.RectorModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.RECTOR]}
  },
  {
    path: 'reviewer',
    loadChildren: () => import('./reviewer/reviewer.module').then(m => m.ReviewerModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.REVIEWER]}
  },
  {
    path: 'secretary',
    loadChildren: () => import('./secretary/secretary.module').then(m => m.SecretaryModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.SECRETARY]}
  },
  {
    path: 'welfare',
    loadChildren: () => import('./welfare/welfare.module').then(m => m.WelfareModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.WELFARE]}
  },
  {
    path: 'coordinator-academic',
    loadChildren: () => import('./coordinator-academic/coordinator-academic.module').then(m => m.CoordinatorAcademicModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.COORDINATOR_ACADEMIC]}
  },
  {
    path: 'events',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
