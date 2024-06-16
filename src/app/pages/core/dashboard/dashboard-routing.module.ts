import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {RectorComponent} from "./rector/rector.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {StudentComponent} from "./student/student.component";
import {CoordinatorAdministrativeComponent} from "./coordinator-administrative/coordinator-administrative.component";
import {CoordinatorCareerComponent} from "./coordinator-career/coordinator-career.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
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
    component: CoordinatorCareerComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
