import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvaluationRoutingModule } from './teacher-evaluation-routing.module';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ResponseFormComponent } from './response-form/response-form.component';
import { ResponseListComponent } from './response-list/response-list.component';


@NgModule({
  declarations: [
    EvaluationListComponent,
    EvaluationFormComponent,
    QuestionListComponent,
    QuestionFormComponent,
    ResponseFormComponent,
    ResponseListComponent
  ],
  imports: [
    CommonModule,
    TeacherEvaluationRoutingModule
  ]
})
export class TeacherEvaluationModule { }
