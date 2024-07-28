import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorAcademicRoutingModule } from './coordinator-academic-routing.module';
import { CoordinatorAcademicComponent } from './coordinator-academic.component';
import {AccordionModule} from "primeng/accordion";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {TagModule} from "primeng/tag";


@NgModule({
  declarations: [
    CoordinatorAcademicComponent
  ],
    imports: [
        CommonModule,
        CoordinatorAcademicRoutingModule,
        AccordionModule,
        Button,
        CardModule,
        PrimeTemplate,
        TagModule
    ]
})
export class CoordinatorAcademicModule { }
