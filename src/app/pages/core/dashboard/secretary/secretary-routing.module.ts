import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecretaryComponent} from "./secretary.component";
import {EnrollmentComponent} from "./enrollment/enrollment.component";

const routes: Routes = [
  {path: '', component: SecretaryComponent},
  {path: 'enrollments', component: EnrollmentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule {
}
