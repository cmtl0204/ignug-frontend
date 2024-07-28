import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {WelfareRoutingModule} from './welfare-routing.module';
import {UtilsModule} from "@utils/utils.module";

// PrimeNg Modules
import {AccordionModule} from "primeng/accordion";
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {PaginatorModule} from "primeng/paginator";
import {PanelMenuModule} from "primeng/panelmenu";
import {PanelModule} from "primeng/panel";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";

// Components
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";

@NgModule({
  declarations: [
    EnrollmentListComponent
  ],
    imports: [
        CommonModule,
        WelfareRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        MessageModule,
        ToolbarModule,
        PaginatorModule,
        TableModule,
        TagModule,
        SplitButtonModule,
        InputTextModule,
        SidebarModule,
        PanelMenuModule,
        UtilsModule,
        PanelModule,
        DividerModule,
        InputSwitchModule,
        TableModule,
        TabViewModule,
        CalendarModule,
        AccordionModule,
        DialogModule,
        DropdownModule,
        BadgeModule,
        OverlayPanelModule,
        InputGroupAddonModule,
        InputGroupModule
    ]
})
export class WelfareModule {
}
