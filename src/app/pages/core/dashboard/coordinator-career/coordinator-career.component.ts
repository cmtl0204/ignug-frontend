import {Component, inject} from '@angular/core';
import {BreadcrumbService} from "@services/core";
import {Router} from "@angular/router";
import {EnrollmentModel} from "@models/core";

@Component({
  selector: 'app-coordinator-career',
  templateUrl: './coordinator-career.component.html',
  styleUrls: ['./coordinator-career.component.scss']
})
export class CoordinatorCareerComponent {
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
        header: 'Historial Estudiantil',
        subheader: 'Gestionar',
        img: `${assetsPath}/enrollment-application.png`,
        routerLink: '/core/coordinator-career/enrollments',
      },
      {
        enabled: true,
        code: 'curriculums',
        header: 'Mallas Curriculares',
        subheader: 'Gestionar',
        img: `${assetsPath}/teacher-distribution.png`,
        routerLink: '/core/coordinator-career/curriculums',
      },
      {
        enabled: true,
        code: 'evaluations',
        header: 'Evaluación Docente',
        subheader: 'Gestionar',
        img: `${assetsPath}/teacher-evaluation.png`,
        routerLink: '/core/coordinator-career/teacher-evaluations',
      }
    );
  }

  redirect(menu: any) {
    this.router.navigate([menu.routerLink]);
  }
}
