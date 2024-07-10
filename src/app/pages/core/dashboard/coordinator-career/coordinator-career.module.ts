import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorCareerRoutingModule } from './coordinator-career-routing.module';
import { PruebaComponent } from './prueba/prueba.component';
import {ChartModule} from "primeng/chart";
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [
    PruebaComponent
  ],
  exports: [
    PruebaComponent
  ],
  imports: [
    CommonModule,
    CoordinatorCareerRoutingModule,
    ChartModule,
    PanelModule
  ]
})
export class CoordinatorCareerModule { }
