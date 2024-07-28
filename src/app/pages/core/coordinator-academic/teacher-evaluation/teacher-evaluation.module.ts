import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherEvaluationRoutingModule } from './teacher-evaluation-routing.module';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ResponseFormComponent } from './response-form/response-form.component';
import { ResponseListComponent } from './response-list/response-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UtilsModule} from "@utils/utils.module";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {PaginatorModule} from "primeng/paginator";
import {PanelMenuModule} from "primeng/panelmenu";
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";


@NgModule({
  declarations: [
    QuestionFormComponent,
    ResponseFormComponent,
    ResponseListComponent
  ],
    imports: [
        CommonModule,
        TeacherEvaluationRoutingModule,
        ReactiveFormsModule,
        UtilsModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        DividerModule,
        InputTextModule,
        PasswordModule,
        RippleModule,
        DropdownModule,
        PanelModule,
        ToolbarModule,
        OverlayPanelModule,
        InputGroupAddonModule,
        InputGroupModule,
        PaginatorModule,
        PanelMenuModule,
        SidebarModule,
        TableModule,
        TagModule,
    ]
})
export class TeacherEvaluationModule { }
