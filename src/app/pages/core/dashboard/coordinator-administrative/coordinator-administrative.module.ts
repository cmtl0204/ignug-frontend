import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorAdministrativeRoutingModule } from './coordinator-administrative-routing.module';
import {ChartModule} from "primeng/chart";
import {UtilsModule} from "@utils/utils.module";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoordinatorAdministrativeRoutingModule,
    ChartModule,
    UtilsModule,
    ToolbarModule,
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    MultiSelectModule,
    PanelModule,
  ]
})
export class CoordinatorAdministrativeModule { }
