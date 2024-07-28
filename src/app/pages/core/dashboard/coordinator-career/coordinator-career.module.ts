import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoordinatorCareerRoutingModule} from './coordinator-career-routing.module';
import {ChartModule} from "primeng/chart";
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    CoordinatorCareerRoutingModule,
    ChartModule,
    PanelModule
  ]
})
export class CoordinatorCareerModule {
}
