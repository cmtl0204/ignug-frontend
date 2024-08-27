import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvaluationRoutingModule } from './teacher-evaluation-routing.module';
import { TeacherEvaluationComponent } from './teacher-evaluation.component';
import {CoordinatorEvaluationFormComponent} from "./coordinator-evaluation-form/coordinator-evaluation-form.component";
import {EvaluationListComponent} from "./evaluation-list/evaluation-list.component";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {SharedModule} from "@coreShared/shared.module";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {UtilsModule} from "@utils/utils.module";
import {PanelMenuModule} from "primeng/panelmenu";
import {SidebarModule} from "primeng/sidebar";


@NgModule({
  declarations: [
    TeacherEvaluationComponent,
    CoordinatorEvaluationFormComponent,
    EvaluationListComponent
  ],
    imports: [
        CommonModule,
        TeacherEvaluationRoutingModule,
        CardModule,
        Button,
        DividerModule,
        SharedModule,
        TableModule,
        TagModule,
        UtilsModule,
        PanelMenuModule,
        SidebarModule
    ]
})
export class TeacherEvaluationModule { }
