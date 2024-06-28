import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { RectorComponent } from './rector/rector.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { CoordinatorAdministrativeComponent } from './coordinator-administrative/coordinator-administrative.component';
import { CoordinatorCareerComponent } from './coordinator-career/coordinator-career.component';
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagModule} from "primeng/tag";
import { InputOtpModule } from 'primeng/inputotp';

@NgModule({
  declarations: [
    AdminComponent,
    RectorComponent,
    TeacherComponent,
    StudentComponent,
    CoordinatorAdministrativeComponent,
    CoordinatorCareerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    TagModule,
    InputOtpModule,
    FormsModule
  ]
})
export class DashboardModule { }
