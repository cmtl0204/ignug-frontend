import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard.component";
import {CoordinatorCareerComponent} from "./coordinator-career.component";

const routes: Routes = [{
  path: '',
  component: CoordinatorCareerComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorCareerRoutingModule { }
