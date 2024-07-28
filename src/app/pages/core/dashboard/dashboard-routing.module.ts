import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeacherComponent} from "./teacher/teacher.component";
import {StudentComponent} from "./student/student.component";
import {CoordinatorAdministrativeComponent} from "./coordinator-administrative/coordinator-administrative.component";
import {SecretaryModule} from "./secretary/secretary.module";
import {CoordinatorCareerModule} from "./coordinator-career/coordinator-career.module";
import {CoordinatorAcademicModule} from "./coordinator-academic/coordinator-academic.module";
import {AdminModule} from "./admin/admin.module";
import {RectorModule} from "./rector/rector.module";
import {TeacherModule} from "./teacher/teacher.module";
import {StudentModule} from "./student/student.module";
import {CoordinatorAdministrativeModule} from "./coordinator-administrative/coordinator-administrative.module";

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => AdminModule)
  },
  {
    path: 'secretary',
    loadChildren: () => import('./secretary/secretary.module').then(m => SecretaryModule)
  },
  {
    path: 'rector',
    loadChildren: () => import('./rector/rector.module').then(m => RectorModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.module').then(m => TeacherModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => StudentModule)
  },
  {
    path: 'coordinator-administrative',
    loadChildren: () => import('./coordinator-administrative/coordinator-administrative.module').then(m => CoordinatorAdministrativeModule)

  },
  {
    path: 'coordinator-career',
    loadChildren: () => import('./coordinator-career/coordinator-career.module').then(m => CoordinatorCareerModule)
  },
  {
    path: 'coordinator-academic',
    loadChildren: () => import('./coordinator-academic/coordinator-academic.module').then(m => CoordinatorAcademicModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
