import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretaryRoutingModule } from './secretary-routing.module';
import { SecretaryComponent } from './secretary.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

import { ChartModule } from 'primeng/chart';
import {UtilsModule} from "@utils/utils.module";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {PanelModule} from "primeng/panel";

@NgModule({
  declarations: [
    SecretaryComponent,
    EnrollmentComponent
  ],
  imports: [
    CommonModule,
    SecretaryRoutingModule,
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
export class SecretaryModule { }
