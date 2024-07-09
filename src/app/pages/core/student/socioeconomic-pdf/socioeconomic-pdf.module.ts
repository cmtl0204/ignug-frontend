import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {SocioeconomicPdfRoutingModule} from './socioeconomic-pdf-routing.module';
import {SocioeconomicPdfComponent} from "./socioeconomic-pdf.component";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [SocioeconomicPdfComponent],
    imports: [
        CommonModule,
        SocioeconomicPdfRoutingModule,
        PdfViewerModule,
        ButtonModule
    ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class SocioeconomicPdfModule {
}
