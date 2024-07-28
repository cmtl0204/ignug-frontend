import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {EnrollmentModel} from "@models/core";
import {BreadcrumbService} from "@services/core";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
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
    const assetsPath = 'assets/images/components/dashboards/teacher';

    this.transactionMenus.push(
      {
        enabled: true,
        code: 'evaluations',
        header: 'Evaluación Docente',
        subheader: 'Gestionar',
        img: `${assetsPath}/evaluation.png`,
        routerLink: '/core/teacher/teacher-evaluations',
      },
      {
        enabled: true,
        code: 'teacherDistributions',
        header: 'Distributivo Docente',
        subheader: 'Gestionar',
        img: `${assetsPath}/teacher-distribution.png`,
        routerLink: '/core/teacher/teacher-distributions',
      },
    );
  }

  redirect(menu: any) {
    this.router.navigate([menu.routerLink]);
  }
}
