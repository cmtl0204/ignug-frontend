import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoordinatorAdministrativeComponent} from "./coordinator-administrative.component";

const routes: Routes = [
  {
    path: '',
    component: CoordinatorAdministrativeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorAdministrativeRoutingModule { }
