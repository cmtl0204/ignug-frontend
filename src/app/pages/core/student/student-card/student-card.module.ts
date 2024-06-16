import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {StudentCardRoutingModule} from './student-card-routing.module';
import {StudentCardComponent} from "./student-card.component";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [StudentCardComponent],
    imports: [
        CommonModule,
        StudentCardRoutingModule,
        PdfViewerModule,
        ButtonModule
    ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class StudentCardModule {
}
