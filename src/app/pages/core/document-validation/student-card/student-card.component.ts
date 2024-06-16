import {Component, inject, Input, OnInit} from '@angular/core';
import {BreadcrumbService, CareersService, SchoolPeriodsService, StudentsHttpService} from "@services/core";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";
import {BreadcrumbEnum} from "@shared/enums";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {
  @Input() identification!: string;
  @Input() careerCode!: string;
  private readonly studentsHttpService = inject(StudentsHttpService);
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly careersService = inject(CareersService);
  private readonly schoolPeriodsService = inject(SchoolPeriodsService);
  protected pdfSrc: string = '';
  protected pdf!: Blob;
  protected isLoadingPdf: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.STUDENT_CARD},
    ]);

    this.generateStudentCard();
    console.log();
    console.log();
  }

  ngOnInit() {
    console.log(this.identification);
  }

  generateStudentCard() {
    this.isLoadingPdf = false;

    this.studentsHttpService.generateStudentCard(
      this.activatedRoute.snapshot.params['identification'],
      this.activatedRoute.snapshot.queryParams['careerCode'],
      this.schoolPeriodsService.openSchoolPeriod.id).subscribe(
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
