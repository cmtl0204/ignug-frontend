import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollmentCertificateComponent} from "./enrollment-certificate/enrollment-certificate.component";
import {StudentCardComponent} from "./student-card/student-card.component";

const routes: Routes = [
  {
    path: 'enrollment-certificate/:enrollmentId',
    component: EnrollmentCertificateComponent
  },
  {
    path: 'student-card/:identification',
    component: StudentCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentValidationRoutingModule {
}
