import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {StudentEvaluationFormComponent} from "./student-evaluation-form/student-evaluation-form.component";

const routes: Routes = [
  {
    path: '',
    component: EvaluationListComponent
  },
  {
    path: 'student-evaluations/:id',
    component: StudentEvaluationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvaluationRoutingModule { }
