import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoordinatorAcademicComponent} from "./coordinator-academic.component";

const routes: Routes = [
  {
    path:'',
    component:CoordinatorAcademicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorAcademicRoutingModule { }
