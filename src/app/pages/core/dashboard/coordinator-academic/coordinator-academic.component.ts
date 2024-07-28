import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {EnrollmentModel} from "@models/core";
import {BreadcrumbService} from "@services/core";

@Component({
  selector: 'app-coordinator-academic',
  templateUrl: './coordinator-academic.component.html',
  styleUrl: './coordinator-academic.component.scss'
})
export class CoordinatorAcademicComponent {
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
    const assetsPath = 'assets/images/components/dashboards/coordinator-academic';

    this.transactionMenus.push(
      {
        enabled: true,
        code: 'evaluations',
        header: 'Evaluación Docente',
        subheader: 'Gestionar',
        img: `${assetsPath}/teacher-evaluation.png`,
        routerLink: '/core/coordinator-academic/teacher-evaluations',
      },
      {
        enabled: true,
        code: 'teacherDistributions',
        header: 'Distributivo Docente',
        subheader: 'Gestionar',
        img: `${assetsPath}/teacher-distribution.png`,
        routerLink: '/core/coordinator-academic/teacher-distributions',
      },
    );
  }

  redirect(menu: any) {
    this.router.navigate([menu.routerLink]);
  }
}
