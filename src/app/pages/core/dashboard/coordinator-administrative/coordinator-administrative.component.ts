import {Component, inject} from '@angular/core';
import {BreadcrumbService} from "@services/core";
import {Router} from "@angular/router";
import {EnrollmentModel} from "@models/core";

@Component({
  selector: 'app-coordinator-administrative',
  templateUrl: './coordinator-administrative.component.html',
  styleUrls: ['./coordinator-administrative.component.scss']
})
export class CoordinatorAdministrativeComponent {

  protected transactionMenus: any = [];
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly router = inject(Router);
  protected state: boolean = true;
  protected enrollment!: EnrollmentModel;

  constructor() {
    this.breadcrumbService.setItems([{label: 'Dashboard'}]);
    this.loadMenus();
  }

  loadMenus() {
    const assetsPath = 'assets/images/components/dashboards/coordinator-career';

    this.transactionMenus.push(
      {
        enabled: true,
        code: 'enrollment',
        header: 'Matricula Estudiantil',
        subheader: 'Gestionar',
        img: `${assetsPath}/enrollment-application.png`,
        routerLink: '/core/coordinator-administrative/enrollments',
      }
    );
  }

  redirect(menu: any) {
    this.router.navigate([menu.routerLink]);
  }
}

