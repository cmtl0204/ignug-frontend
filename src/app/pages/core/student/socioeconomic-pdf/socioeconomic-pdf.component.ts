import {Component, inject} from '@angular/core';
import {BreadcrumbService, CareersService, SchoolPeriodsService, StudentsHttpService} from "@services/core";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";
import {BreadcrumbEnum} from "@utils/enums";

@Component({
  selector: 'app-socioeconomic-pdf',
  templateUrl: './socioeconomic-pdf.component.html',
  styleUrls: ['./socioeconomic-pdf.component.scss']
})
export class SocioeconomicPdfComponent {
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
      {label: BreadcrumbEnum.SOCIOECONOMIC_FORM},
    ]);

    this.generateStudentCard();
  }

  generateStudentCard() {
    this.isLoadingPdf = false;

    this.studentsHttpService.generateSocioeconomicForm(this.authService.auth.student.id)
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
    const fileName = 'Ficha_Socioeconomica_' + this.authService.auth.identification;
    downloadLink.setAttribute('download', fileName + '.pdf');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  protected readonly PrimeIcons = PrimeIcons;
}
