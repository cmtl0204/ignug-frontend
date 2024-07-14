import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {EvaluationFormComponent} from "./evaluation-form/evaluation-form.component";

const routes: Routes = [
  {
    path: 'evaluations',
    component: EvaluationListComponent,
  },
  {
    path: 'evaluations/:id',
    component: EvaluationFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvaluationRoutingModule {
}
