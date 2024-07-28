import {Component, inject} from '@angular/core';
import {BreadcrumbService, CareersService, SchoolPeriodsService, StudentsHttpService} from "@services/core";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";
import {BreadcrumbEnum} from "@utils/enums";

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent {
  private readonly studentsHttpService = inject(StudentsHttpService);
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly careersService = inject(CareersService);
  private readonly schoolPeriodsService = inject(SchoolPeriodsService);
  protected pdfSrc: string = '';
  protected pdf!: Blob;
  protected isLoadingPdf: boolean = false;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.STUDENT_CARD},
    ]);

    this.generateStudentCard();
  }

  generateStudentCard() {
    this.isLoadingPdf = false;

    this.studentsHttpService.generateStudentCard(
      this.authService.auth.student.id,
      this.careersService.career.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(
        (pdf) => {
          this.pdf = pdf;
          const reader = new FileReader();
          reader.readAsDataURL(pdf);
          reader.onloadend = () => {
            if (typeof reader.result === 'string')
              this.pdfSrc = reader.result;
            this.isLoadingPdf = true;
          };
        }, (error) => {
          this.pdfSrc = 'error';
        }
      );
  }

  download() {
    const filePath = URL.createObjectURL(new Blob([this.pdf]));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    const fileName = 'Carnet_Estudiantil_' + this.authService.auth.identification;
    downloadLink.setAttribute('download', fileName + '.pdf');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  protected readonly PrimeIcons = PrimeIcons;
}
