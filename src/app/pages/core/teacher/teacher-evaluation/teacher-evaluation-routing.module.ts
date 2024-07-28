import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {AutoEvaluationFormComponent} from "./auto-evaluation-form/auto-evaluation-form.component";
import {PartnerEvaluationFormComponent} from "./partner-evaluation-form/partner-evaluation-form.component";


const routes: Routes = [
  {
    path: '',
    component: EvaluationListComponent
  },
  {
    path: 'auto-evaluations/:id',
    component: AutoEvaluationFormComponent,
  },
  {
    path: 'partner-evaluations/:id',
    component: PartnerEvaluationFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvaluationRoutingModule {
}
