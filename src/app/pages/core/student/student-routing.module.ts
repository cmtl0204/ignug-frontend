import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from "@utils/guards";
import {RolesEnum} from "@utils/enums";

const routes: Routes = [
  {
    path: 'enrollment-application',
    loadChildren: () => import('./enrollment-application/enrollment-application.module').then(m => m.EnrollmentApplicationModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'enrollment-subjects',
    loadChildren: () => import('./enrollment-subject/enrollment-subject.module').then(m => m.EnrollmentSubjectModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'socioeconomic',
    loadChildren: () => import('./socioeconomic/socioeconomic.module').then(m => m.SocioeconomicModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'student-card',
    loadChildren: () => import('./student-card/student-card.module').then(m => m.StudentCardModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'socioeconomic-pdf',
    loadChildren: () => import('./socioeconomic-pdf/socioeconomic-pdf.module').then(m => m.SocioeconomicPdfModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'socioeconomic-pdf',
    loadChildren: () => import('./socioeconomic-pdf/socioeconomic-pdf.module').then(m => m.SocioeconomicPdfModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
  {
    path: 'teacher-evaluations',
    loadChildren: () => import('./teacher-evaluation/teacher-evaluation.module').then(m => m.TeacherEvaluationModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
