import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvaluationRoutingModule } from './teacher-evaluation-routing.module';
import { TeacherEvaluationComponent } from './teacher-evaluation.component';


@NgModule({
  declarations: [
    TeacherEvaluationComponent
  ],
  imports: [
    CommonModule,
    TeacherEvaluationRoutingModule
  ]
})
export class TeacherEvaluationModule { }
