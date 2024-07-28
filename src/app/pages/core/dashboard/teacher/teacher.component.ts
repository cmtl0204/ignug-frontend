import {Component, inject} from '@angular/core';
import {BreadcrumbService, CareersService, RoutesService, StudentsHttpService} from "@services/core";
import {AuthService} from "@services/auth";
import {Router} from "@angular/router";
import {EnrollmentModel} from "@models/core";
import {CatalogueEnrollmentStateEnum} from "@shared/enums";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  protected transactionMenus: any = [];
  protected scheduleLinks: any[] = [];
  private readonly authService = inject(AuthService);
  private readonly routesService = inject(RoutesService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly router = inject(Router);
  private readonly careersService = inject(CareersService);
  private readonly studentsHttpService = inject(StudentsHttpService);
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
        img: `${assetsPath}/grades.png`,
        routerLink: '/core/teacher/teacher-distributions',
      },
    );
  }

  redirect(menu: any) {
    if (menu.code === 'schedule') {
      const downloadLink = document.createElement('a');
      downloadLink.href = menu.routerLink;
      downloadLink.target = '_blank';
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } else {
      if (menu.code === 'socioEconomicForm') {
        const valid = ['1309824819',
          '1050189750',
          '2200506653',
          '1725919458',
          '1720434867',
          '1753996915',
          '1805266218',
          '0850169319',
          '1724147044',
          '0803639301',
          '1313779629',
          '1721075883',
          '1714090816',
          '2200462188',
          '1722625512',
          '1751176783',
          '1724499130',
          '1050441615',
          '1721033791',
          '0550610612',
          '1004373815',
          '0604139519',
          '1050199221',
          '1400897029',
          '0603839986',
          '2300132533',
          '1401219041',
          '1752444370',
          '1752459139',
          '1207877851',
          '1726391558',
          '1756072037',
          '1721124376',
          '1721059663',
          '1718275967',
          '1727250969',
          '2100061221',
          '1004479760',
          '1720354735'].includes(this.authService.auth.identification);

        if (valid)
          this.router.navigate([menu.routerLink]);
      } else {
        this.router.navigate([menu.routerLink]);
      }
    }
  }
}
