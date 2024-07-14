import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorAcademicRoutingModule } from './coordinator-academic-routing.module';
import { CoordinatorAcademicComponent } from './coordinator-academic.component';


@NgModule({
  declarations: [
    CoordinatorAcademicComponent
  ],
  imports: [
    CommonModule,
    CoordinatorAcademicRoutingModule
  ]
})
export class CoordinatorAcademicModule { }
