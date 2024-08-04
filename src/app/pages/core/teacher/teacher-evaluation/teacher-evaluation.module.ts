import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvaluationRoutingModule } from './teacher-evaluation-routing.module';
import { TeacherEvaluationComponent } from './teacher-evaluation.component';
import {FormsModule} from "@angular/forms";
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {SharedModule} from "@coreShared/shared.module";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {PartnerEvaluationFormComponent} from "./partner-evaluation-form/partner-evaluation-form.component";
import {AutoEvaluationFormComponent} from "./auto-evaluation-form/auto-evaluation-form.component";
import {DividerModule} from "primeng/divider";


@NgModule({
  declarations: [
    TeacherEvaluationComponent,
    AutoEvaluationFormComponent,
    EvaluationListComponent,
    PartnerEvaluationFormComponent
  ],
    imports: [
        CommonModule,
        TeacherEvaluationRoutingModule,
        FormsModule,
        SharedModule,
        CardModule,
        Button,
        DividerModule
    ]
})
export class TeacherEvaluationModule { }
