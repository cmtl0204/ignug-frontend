import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {RectorComponent} from "./rector/rector.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {StudentComponent} from "./student/student.component";
import {CoordinatorAdministrativeComponent} from "./coordinator-administrative/coordinator-administrative.component";
import {CoordinatorCareerComponent} from "./coordinator-career/coordinator-career.component";
import {SecretaryModule} from "./secretary/secretary.module";
import {CoordinatorCareerModule} from "./coordinator-career/coordinator-career.module";
import {CoordinatorAcademicModule} from "./coordinator-academic/coordinator-academic.module";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'secretary',
    loadChildren: () => import('./secretary/secretary.module').then(m => SecretaryModule)
  },
  {
    path: 'rector',
    component: RectorComponent
  },
  {
    path: 'teacher',
    component: TeacherComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'coordinator-administrative',
    component: CoordinatorAdministrativeComponent
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
