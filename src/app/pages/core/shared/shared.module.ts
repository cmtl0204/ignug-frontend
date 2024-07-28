import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {TeacherEvaluationFormComponent} from "./teacher-evaluation-form/teacher-evaluation-form.component";
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {TagModule} from "primeng/tag";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {PanelMenuModule} from "primeng/panelmenu";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {CardModule} from "primeng/card";
import {ReactiveFormsModule} from "@angular/forms";
import {UtilsModule} from "@utils/utils.module";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    TeacherEvaluationFormComponent
  ],
  exports: [
    TeacherEvaluationFormComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    UtilsModule,
    ButtonModule,
    RippleModule,
    MessageModule,
    ToolbarModule,
    PaginatorModule,
    TableModule,
    TabViewModule,
    TagModule,
    SplitButtonModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    InputNumberModule,
    CalendarModule,
    PanelModule,
    DividerModule,
    RadioButtonModule,
    RatingModule,
    CardModule,
  ]
})
export class SharedModule {
}
