import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentCardComponent} from "./student-card.component";

const routes: Routes = [
  {
    path: '',
    component: StudentCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCardRoutingModule {
}
