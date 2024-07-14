import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoordinatorCareerRoutingModule} from './coordinator-career-routing.module';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';

@NgModule({
  declarations: [
    EvaluationFormComponent,
    EvaluationListComponent
  ],
  imports: [
    CommonModule,
    CoordinatorCareerRoutingModule
  ]
})
export class CoordinatorCareerModule {
}
