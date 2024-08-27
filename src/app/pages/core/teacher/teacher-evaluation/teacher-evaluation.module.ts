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
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ChartModule} from "primeng/chart";
import {MessagesModule} from "primeng/messages";
import {PanelModule} from "primeng/panel";
import {TooltipModule} from "primeng/tooltip";


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
        DividerModule,
        AccordionModule,
        TableModule,
        TagModule,
        ChartModule,
        MessagesModule,
        PanelModule,
        TooltipModule
    ]
})
export class TeacherEvaluationModule { }
