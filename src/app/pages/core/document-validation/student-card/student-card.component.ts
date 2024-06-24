import {Component, inject, Input, OnInit} from '@angular/core';
import {BreadcrumbService, CareersService, SchoolPeriodsService, StudentsHttpService} from "@services/core";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";
import {BreadcrumbEnum, SeverityButtonActionEnum} from "@shared/enums";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {
  @Input() studentId!: string;
  @Input() careerId!: string;
  @Input() schoolPeriodId!: string;
  private readonly studentsHttpService = inject(StudentsHttpService);
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly careersService = inject(CareersService);
  private readonly schoolPeriodsService = inject(SchoolPeriodsService);
  protected pdfSrc: string = '';
  protected pdf!: Blob;
  protected isLoadingPdf: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.STUDENT_CARD}]);
  }

  ngOnInit() {
    this.generateStudentCard();
  }

  generateStudentCard() {
    this.isLoadingPdf = false;

    if (this.authService.auth) {
      this.studentId = this.authService.auth.student.id;
      this.careerId = this.careersService.career.id;
      this.schoolPeriodId = this.schoolPeriodsService.openSchoolPeriod.id;
    }

    this.studentsHttpService.generateStudentCard(
      this.studentId,
      this.careerId,
      this.schoolPeriodId).subscribe(
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
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
