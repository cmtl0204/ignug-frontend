import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocumentValidationRoutingModule} from './document-validation-routing.module';
import {DocumentValidationComponent} from './document-validation.component';
import {EnrollmentCertificateComponent} from './enrollment-certificate/enrollment-certificate.component';
import {PanelModule} from "primeng/panel";
import {StudentCardComponent} from './student-card/student-card.component';
import {ButtonModule} from "primeng/button";
import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  declarations: [
    DocumentValidationComponent,
    EnrollmentCertificateComponent,
    StudentCardComponent
  ],
  imports: [
    CommonModule,
    DocumentValidationRoutingModule,
    PanelModule,
    ButtonModule,
    PdfViewerModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class DocumentValidationModule {
}
