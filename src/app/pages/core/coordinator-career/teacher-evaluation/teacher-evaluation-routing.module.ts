import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {CoordinatorEvaluationFormComponent} from "./coordinator-evaluation-form/coordinator-evaluation-form.component";

const routes: Routes = [
  {
    path: '',
    component: EvaluationListComponent
  },
  {
    path: 'coordinator-evaluations/:id',
    component: CoordinatorEvaluationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvaluationRoutingModule { }
