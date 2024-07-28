import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import {UtilsModule} from "@utils/utils.module";

// PrimeNg Modules
import {ButtonModule} from "primeng/button";
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {PaginatorModule} from "primeng/paginator";
import {PanelMenuModule} from "primeng/panelmenu";
import {PanelModule} from "primeng/panel";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";

// Components
import {StudentFormComponent} from './student-form/student-form.component';
import {StudentListComponent} from './student-list/student-list.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentListComponent,
    EvaluationFormComponent,
    EvaluationListComponent,
  ],
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    UtilsModule,
    ButtonModule,
    CalendarModule,
    DividerModule,
    InputSwitchModule,
    InputTextModule,
    MessageModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    RippleModule,
    SidebarModule,
    SplitButtonModule,
    StudentRoutingModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToolbarModule,
    PdfViewerModule,
  ]
})
export class StudentModule {
}
