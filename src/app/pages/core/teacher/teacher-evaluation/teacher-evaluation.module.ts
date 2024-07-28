import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvaluationRoutingModule } from './teacher-evaluation-routing.module';
import { TeacherEvaluationComponent } from './teacher-evaluation.component';
import {FormsModule} from "@angular/forms";
import {EvaluationFormComponent} from "./evaluation-form/evaluation-form.component";
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {SharedModule} from "@coreShared/shared.module";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {PartnerEvaluationFormComponent} from "./partner-evaluation-form/partner-evaluation-form.component";


@NgModule({
  declarations: [
    TeacherEvaluationComponent,
    EvaluationFormComponent,
    EvaluationListComponent,
    PartnerEvaluationFormComponent
  ],
  imports: [
    CommonModule,
    TeacherEvaluationRoutingModule,
    FormsModule,
    SharedModule,
    CardModule,
    Button
  ]
})
export class TeacherEvaluationModule { }
