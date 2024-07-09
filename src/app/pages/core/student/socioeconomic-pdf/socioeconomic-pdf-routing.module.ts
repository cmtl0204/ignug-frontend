import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocioeconomicPdfComponent} from "./socioeconomic-pdf.component";

const routes: Routes = [
  {
    path: '',
    component: SocioeconomicPdfComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocioeconomicPdfRoutingModule {
}
