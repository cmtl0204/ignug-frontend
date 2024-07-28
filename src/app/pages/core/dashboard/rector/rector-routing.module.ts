import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RectorComponent} from "./rector.component";

const routes: Routes = [
  {
    path: '',
    component: RectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RectorRoutingModule { }
