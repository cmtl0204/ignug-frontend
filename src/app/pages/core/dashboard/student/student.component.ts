import {Component, inject} from '@angular/core';
import {BreadcrumbService, CareersService, RoutesService, StudentsHttpService} from "@services/core";
import {Router} from "@angular/router";
import {AuthService} from "@services/auth";
import {CatalogueEnrollmentStateEnum, EnrollmentEnum, EnrollmentSateEnum} from "@shared/enums";
import {EnrollmentModel} from "@models/core";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
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
  private valid = ['1309824819',
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

  constructor() {
    this.breadcrumbService.setItems([{label: 'Dashboard'}]);
    this.findEnrollmentByStudent();
  }

  findEnrollmentByStudent() {
    this.studentsHttpService.findEnrollmentByStudent(this.authService.auth.student.id)
      .subscribe(enrollment => {
        this.enrollment = enrollment;

        if (enrollment?.enrollmentState) {
          switch (enrollment.enrollmentState.state.code) {
            case CatalogueEnrollmentStateEnum.ENROLLED:
            case CatalogueEnrollmentStateEnum.APPROVED:
            case CatalogueEnrollmentStateEnum.REQUEST_SENT:
              this.state = true;
              break
            default:
              this.state = false;
          }
        }

        this.loadScheduleLinks();
        this.loadMenus();
      });
  }

  loadScheduleLinks() {
    this.scheduleLinks.push(
      {
        code: '650811G01-S-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/Eo5Af5El6pVGhEeNQ0xMR7kBj4_jiBDmIMPxxcmStDRZyQ?e=HPseXD'
      },
      {
        code: '1068-650321H01-H-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/EqaJQ5TVFYxPtM-hxJ4vs_QBG1GyOhmL6wSLrKMG08I_uA?e=0MqKQD'
      },
      {
        code: '650331C01-S-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/Eu9RSHidK0dPgEF3l75zVTUBx1hEvG0rbvYwfzyYAi8QUw?e=neepuz'
      },
      {
        code: '1068-650311D01-H-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/Eo_EqXbeuZZAjbW14FeangsBO0eUCDqG2UwK8F9KqczO9Q?e=i5JIWa'
      },
      {
        code: '1068-6503183A01-H-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/EoIyzL6TNKNNgIn9uhfwEwIBahPS7wX94Alli8GunXCDTg?e=KXaOwG'
      },
      {
        code: '650112B01-S-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/EgWNI_gQ4aVIkfKIjirzFKEBb0zHF6YHCUEeCVvP6GeM5g?e=tB4f3M'
      },
      {
        code: '650314H01-S-1702',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/Eh5KhN_yLttLn6LlaUzj0J4BEXYQDkEpDyXbIZpgTgFzAA?e=XBfGWY'
      },
      {
        code: '1068-650314H01-H-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/EtCzurKrswxKmyYe3Ktw5EQBPIFsrDFQM6kRH-mB862YMQ?e=rtFFYU'
      },
      {
        code: '651015D01-H-1701',
        link: 'https://uwaec.sharepoint.com/:f:/s/documentos.direcciongeneral.academica/Er3wiHn2qMJBvJaBq_KGBKwB0IDJ-Tf07tIlgIpwGPM_rQ?e=62Za58'
      }
    );
  }

  loadMenus() {
    const assetsPath = 'assets/images/components/dashboards/student';

    this.transactionMenus.push(
      {
        enabled: true,
        code: 'enrollment_application',
        header: 'Proceso de matricula',
        subheader: 'Gestionar',
        img: `${assetsPath}/enrollment-application.png`,
        routerLink: '/core/student/enrollment-application',
      },
      {
        enabled: true,
        code: 'subjects',
        header: 'Mis Asignaturas',
        subheader: 'Ver',
        img: `${assetsPath}/subjects.png`,
        routerLink: '/core/student/enrollment-subjects',
      },
      {
        code: 'schedule',
        enabled: this.state,
        header: 'Horario de clases',
        subheader: 'Descargar',
        img: `${assetsPath}/schedule.png`,
        routerLink: this.scheduleLinks.find(scheduleLink => scheduleLink.code === this.careersService.career.code)?.link,
      },
      {
        code: 'studentCard',
        enabled: this.state,
        header: 'Carnet Estudiantil',
        subheader: 'Descargar',
        img: `${assetsPath}/student-card.png`,
        routerLink: '/core/student/student-card',
      },
      {
        code: 'socioEconomicPdf',
        enabled: this.state,
        header: 'PDF Ficha Socioeconómica',
        subheader: 'Descargar',
        img: `${assetsPath}/socioeconomic-pdf.png`,
        routerLink: '/core/student/socioeconomic-pdf',
      },
    );

    if (this.valid) {
      this.transactionMenus.push({
        code: 'socioEconomicForm',
        enabled: this.valid,
        header: 'Ficha Socioeconómica',
        subheader: 'Descargar',
        img: `${assetsPath}/socioeconomic-form.png`,
        routerLink: '/core/student/socioeconomic',
      });
    }
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
