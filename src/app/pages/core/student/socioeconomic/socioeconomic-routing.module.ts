import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from "@utils/guards";
import {RolesEnum} from "@utils/enums";

const routes: Routes = [
  {
    path: 'socioeconomic',
    loadChildren: () => import('./socioeconomic-form/socioeconomic-form.module').then(m => m.SocioeconomicFormModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.STUDENT]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocioeconomicRoutingModule {
}
