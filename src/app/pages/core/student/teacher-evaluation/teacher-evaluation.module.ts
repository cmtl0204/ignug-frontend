import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherEvaluationRoutingModule} from './teacher-evaluation-routing.module';
import {TeacherEvaluationComponent} from "./teacher-evaluation.component";
import {StudentEvaluationFormComponent} from "./student-evaluation-form/student-evaluation-form.component";
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {CardModule} from "primeng/card";
import {SharedModule} from "@coreShared/shared.module";
import {Button, ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {PanelModule} from "primeng/panel";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";


@NgModule({
  declarations: [
    TeacherEvaluationComponent,
    StudentEvaluationFormComponent,
    EvaluationListComponent
  ],
    imports: [
        CommonModule,
        TeacherEvaluationRoutingModule,
        SharedModule,
        CardModule,
        ButtonModule,
        DividerModule,
        PanelModule,
        TableModule,
        TagModule
    ]
})
export class TeacherEvaluationModule {
}
